import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db/db"; // Pfad ggf. anpassen, z.B. ../../lib/db

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password required" }, { status: 400 });
    }

    const existing = await db.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 });
    }
    
    // WICHTIG: In der Realität hier das Passwort hashen!
    // z.B. const hashedPassword = await bcrypt.hash(password, 10);
    // await db.insert({ email, password: hashedPassword, ... });

    await db.insert({ email, password, createdAt: new Date() });
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
