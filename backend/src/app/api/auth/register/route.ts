import { NextRequest, NextResponse } from "next/server";

const users: { email: string; password: string }[] = [];

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const exists = users.find((u) => u.email === email);
  if (exists) {
    return NextResponse.json({ message: "User already exists!" }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ message: "Password must be at least 6 characters long!" }, { status: 400 });
  }

  users.push({ email, password });

  return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });
}
