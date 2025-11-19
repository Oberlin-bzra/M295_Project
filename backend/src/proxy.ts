import { NextResponse } from 'next/server'

export async function proxy() {
  const res = NextResponse.next();
  res.headers.append('access-control-allow-origin', '*');
  res.headers.append('access-control-allow-method', '*');
  res.headers.append('access-control-allow-headers', '*');
  return res;
}

export const config = {
  matcher: '/api/:path*',
}

