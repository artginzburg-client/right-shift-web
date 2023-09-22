import { HomeClient } from './components/HomeClient';
import { getSheet } from './utils/getSheet';

const { CONTENT_SHEET_ID } = process.env;

export default async function Home() {
  if (!CONTENT_SHEET_ID) throw new Error('CONTENT_SHEET_ID environment variable not present');
  const contentSheet = await getSheet(CONTENT_SHEET_ID);
  return <HomeClient contentSheet={contentSheet} />;
}
