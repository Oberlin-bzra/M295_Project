import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { db } from "../../../../lib/db/db"; // Pfad ggf. anpassen, z.B. ../../lib/db

// Dieses Secret MUSS in einer .env Datei liegen
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "supersecretjwtkey");

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password required" }, { status: 400 });
    }

    // WICHTIG: In der Realität hier das Passwort vergleichen!
    // const user = await db.findOne({ email });
    // const passwordMatch = await bcrypt.compare(password, user.password);
    // if (!user || !passwordMatch) { ... }

    const user = await db.findOne({ email, password });
    if (!user) {
      return NextResponse.json({ message: "Wrong login" }, { status: 401 });
    }

    const token = await new SignJWT({ email: user.email, id: user._id }) // Besser die User-ID statt E-Mail nehmen
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(JWT_SECRET);

    return NextResponse.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}