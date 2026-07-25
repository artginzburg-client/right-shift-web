import { redirect } from 'next/navigation';

const { CONTENT_SHEET_ID } = process.env;

export async function GET() {
  if (!CONTENT_SHEET_ID) throw new Error('CONTENT_SHEET_ID environment variable not present');

  return redirect(`https://docs.google.com/spreadsheets/d/${CONTENT_SHEET_ID}/edit`);
}
