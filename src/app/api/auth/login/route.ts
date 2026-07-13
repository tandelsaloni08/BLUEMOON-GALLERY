import { NextResponse } from "next/server";
import { dbConnect, readMockDb } from "@/lib/db/dbConnect";
import { User } from "@/lib/db/models";
import { comparePassword, signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const conn = await dbConnect();

    if (conn) {
      // MongoDB Mode
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
      }

      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
      }

      const token = signToken({ email: user.email, role: user.role, name: user.name });
      return NextResponse.json({
        token,
        user: { name: user.name, email: user.email, role: user.role },
      });
    } else {
      // Mock DB Mode
      const db = readMockDb();
      const user = db.users.find((u: any) => u.email === email);
      if (!user) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
      }

      const isMatch = await comparePassword(password, user.passwordHash);
      if (!isMatch) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
      }

      const token = signToken({ email: user.email, role: user.role, name: user.name });
      return NextResponse.json({
        token,
        user: { name: user.name, email: user.email, role: user.role },
      });
    }
  } catch (err: any) {
    console.error("Login Error:", err);
    return NextResponse.json({ error: err.message || "Login failed" }, { status: 500 });
  }
}
