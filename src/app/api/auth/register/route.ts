import { NextResponse } from "next/server";
import { dbConnect, readMockDb, writeMockDb } from "@/lib/db/dbConnect";
import { User } from "@/lib/db/models";
import { hashPassword, signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const conn = await dbConnect();
    const hashedPassword = await hashPassword(password);

    if (conn) {
      // MongoDB Mode
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ error: "Email already registered" }, { status: 400 });
      }

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "user",
      });

      const token = signToken({ email: user.email, role: user.role, name: user.name });
      return NextResponse.json({ token, user: { name: user.name, email: user.email, role: user.role } });
    } else {
      // Mock DB Mode
      const db = readMockDb();
      const existing = db.users.find((u: any) => u.email === email);
      if (existing) {
        return NextResponse.json({ error: "Email already registered" }, { status: 400 });
      }

      const newUser = {
        name,
        email,
        passwordHash: hashedPassword,
        role: "user",
      };

      db.users.push(newUser);
      writeMockDb(db);

      const token = signToken({ email: newUser.email, role: newUser.role, name: newUser.name });
      return NextResponse.json({ token, user: { name: newUser.name, email: newUser.email, role: newUser.role } });
    }
  } catch (err: any) {
    console.error("Register Error:", err);
    return NextResponse.json({ error: err.message || "Registration failed" }, { status: 500 });
  }
}
