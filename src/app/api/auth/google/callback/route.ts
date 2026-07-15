import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { encrypt, decrypt, hashEmail } from "@/lib/encryption";

export async function GET(req: Request) {
  try {
    const { searchParams, origin } = new URL(req.url);
    const code = searchParams.get("code");
    
    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    
    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: "Google OAuth credentials not configured" }, { status: 500 });
    }

    const redirectUri = `${origin}/api/auth/google/callback`;

    // 1. Exchange auth code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok) {
      console.error("Token Exchange Error:", tokenData);
      return NextResponse.json({ error: tokenData.error_description || "Token exchange failed" }, { status: 400 });
    }

    const { access_token } = tokenData;

    // 2. Fetch user profile info from Google
    const profileResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const profile = await profileResponse.json();
    if (!profileResponse.ok) {
      console.error("Profile Fetch Error:", profile);
      return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 400 });
    }

    const { email, name, picture } = profile;
    if (!email) {
      return NextResponse.json({ error: "Email not provided by Google" }, { status: 400 });
    }

    // 3. Hash email to query database
    const emailHashed = hashEmail(email);

    // 4. Lookup user in Supabase
    const { data: dbUser, error: dbError } = await supabase
      .from("users")
      .select("*")
      .eq("email_hash", emailHashed)
      .maybeSingle();

    if (dbError) {
      console.error("Supabase Database Lookup Error:", dbError);
      return NextResponse.json({ error: "Database error during login" }, { status: 500 });
    }

    let finalUser = {
      name: name || "Google User",
      email: email,
      role: "user",
    };

    if (!dbUser) {
      // Register New User in Supabase with Encrypted Profile Data
      const userDataToEncrypt = {
        name: finalUser.name,
        email: finalUser.email,
        picture: picture || "",
        provider: "google",
        createdAt: new Date().toISOString(),
      };

      const encryptedData = encrypt(userDataToEncrypt);

      const { data: insertedUser, error: insertError } = await supabase
        .from("users")
        .insert({
          email_hash: emailHashed,
          encrypted_data: encryptedData,
          role: "user",
        })
        .select()
        .single();

      if (insertError) {
        console.error("Supabase Insertion Error:", insertError);
        return NextResponse.json({ error: "Failed to register user in database" }, { status: 500 });
      }
    } else {
      // Existing User - Decrypt data to check/get fields
      try {
        const decryptedProfile = decrypt(dbUser.encrypted_data);
        finalUser.name = decryptedProfile.name || finalUser.name;
        finalUser.email = decryptedProfile.email || finalUser.email;
        finalUser.role = dbUser.role || "user";
      } catch (decErr) {
        console.error("Failed to decrypt user details:", decErr);
        // Fallback to Google details if decryption fails
        finalUser.role = dbUser.role || "user";
      }
    }

    // 5. Sign our internal JWT token
    const token = signToken({
      email: finalUser.email,
      role: finalUser.role,
      name: finalUser.name,
    });

    // 6. Return standard script that handles AuthContext local storage and redirects
    const clientPayload = JSON.stringify(finalUser);
    const htmlResponse = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authenticating...</title>
        </head>
        <body>
          <p>Please wait, authenticating and redirecting...</p>
          <script>
            try {
              localStorage.setItem("bluemoon_token", "${token}");
              localStorage.setItem("bluemoon_user", '${clientPayload}');
              
              // Redirect to homepage or user dashboard
              window.location.href = "/";
            } catch (err) {
              console.error("Auth callback redirect script failed:", err);
              document.body.innerHTML = "<p>Auth callback script error. Please refresh or try again.</p>";
            }
          </script>
        </body>
      </html>
    `;

    return new Response(htmlResponse, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (error: any) {
    console.error("Google Callback Error:", error);
    return NextResponse.json({ error: error.message || "OAuth Authentication failed" }, { status: 500 });
  }
}
