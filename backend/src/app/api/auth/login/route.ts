import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

const users = [{ email: "test@ApexTracker.com", password: "123456" }];

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json({ message: "Ungültige Anmeldedaten" }, { status: 401 });
  }

  const secret = new TextEncoder().encode("supersecretjwtkey");
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .sign(secret);

  return NextResponse.json({ token });
}
