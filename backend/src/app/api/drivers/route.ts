import { drivers } from '@seald-io/nedb/lib/db/data';

export async function GET() {
  return Response.json(drivers)
}