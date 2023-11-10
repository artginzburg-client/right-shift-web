import { cache } from 'react';
import 'server-only';

export const sheetConfig = {
  fallback: {
    Contacts: {
      Phone: '+31 6 45 10 65 69',
      Email: 'sales.right.shift@gmail.com',
    },
    Socials: {
      Instagram: 'www.instagram.com/right.shift',
      LinkedIn: 'www.linkedin.com/company/right-shift-dev',
      Telegram: 't.me/leokruglikov',
    },
  } as ContentSheetParsed,
};

/** Not planning to use this for the right-shift-web project. Just an example. */
export const preloadSheet = (id: string) => {
  void getSheet(id);
};

/** @see https://developers.google.com/sheets/api/guides/concepts */
export const getSheet = cache(
  async (
    /** spreadsheetId */
    id: string,
    /** sheetId */
    gid?: string,
  ) => {
    try {
      const result = await fetch(
        `https://docs.google.com/spreadsheets/d/${id}/export?format=tsv${gid ? `&gid=${gid}` : ''}`,
        { next: { tags: [`sheet${id}`] } },
      );
      const text = await result.text();
      const parsed = parseTsv<ContentSheetParsed>(text);
      return prepareSheet(parsed);
    } catch (error) {
      console.error('Failed to get or parse the Google Sheet, falling back to hard-code');
      return sheetConfig.fallback;
    }
  },
);

/** All strings should be supported by HTML, e.g. phone should be compatible with tel:, email with mailto:, and links with href. */
export type ContentSheetParsed = {
  Contacts: {
    Phone: string;
    Email: string;
  };
  Socials: {
    Instagram: string;
    LinkedIn: string;
    Telegram: string;
  };
};

/** Not efficient at all. Just simple and concise. */
function parseTsv<ResultType extends Record<string, unknown>>(text: string) {
  const byNewlines = text.split('\r\n');
  const byTabs = byNewlines.map((row) => row.split('\t'));
  const result = {} as ResultType;
  byTabs.forEach((byTab, byTabIndex) => {
    const isSeparatorRow = byTab[0] === '';
    if (isSeparatorRow) return;

    const isHeadingRow = byTab[1] === '';
    if (!isHeadingRow) return;

    const nextRow = byTabs[byTabIndex + 1];
    const rowAfterNextRow = byTabs[byTabIndex + 2];
    const entries = nextRow.map((cell, cellIndex) => [cell, rowAfterNextRow[cellIndex]]);
    result[byTab[0] as keyof ResultType] = Object.fromEntries(entries);
  });
  return result;
}

function prepareSheet(contentSheet: ContentSheetParsed): ContentSheetParsed {
  const preparedSocials = (
    Object.entries(contentSheet.Socials) as [keyof ContentSheetParsed['Socials'], string][]
  ).map(([key, value]) => {
    return [key, value.replace(/http(s):\/\//g, '')];
  });
  return { ...contentSheet, Socials: Object.fromEntries(preparedSocials) };
}
