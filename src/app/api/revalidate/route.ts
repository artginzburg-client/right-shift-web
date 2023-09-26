import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function GET(request: NextRequest) {
  const spreadsheetId = request.nextUrl.searchParams.get('spreadsheetId');
  if (!spreadsheetId)
    return NextResponse.json({ error: 'spreadsheetId is not defined' }, { status: 403 });
  revalidateTag(`sheet${spreadsheetId}`);
  console.log(`revalidated ${spreadsheetId}`);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
