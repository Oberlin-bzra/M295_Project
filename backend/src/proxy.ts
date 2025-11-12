import { NextResponse } from 'next/server'

export async function proxy() {
  const res = NextResponse.next();
  return res;
}

export const config = {
  matcher: '/api/:path*',
}

