import { drivers } from '@/lib/db/data';

export async function GET() {
  return Response.json(drivers)
}