import {NextRequest} from 'next/server'


export function getJwtHeader(request: NextRequest): string {
  const authHeader = request.headers.get('authorization');
  return (authHeader ? authHeader.substring(`Bearer `.length) : '');
}