import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const origin = req.headers.get("origin") || new URL(req.url).origin;
    
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      return NextResponse.json({ error: "GOOGLE_CLIENT_ID is not configured" }, { status: 500 });
    }

    const redirectUri = `${origin}/api/auth/google/callback`;
    const scope = "openid email profile";
    
    // Construct Google OAuth URL
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${encodeURIComponent(clientId)}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=code&` +
      `scope=${encodeURIComponent(scope)}&` +
      `access_type=offline&` +
      `prompt=consent`;

    return NextResponse.json({ url: googleAuthUrl });
  } catch (error: any) {
    console.error("Google Auth URL Error:", error);
    return NextResponse.json({ error: "Failed to generate Google Auth URL" }, { status: 500 });
  }
}
