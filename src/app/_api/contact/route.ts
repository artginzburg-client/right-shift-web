import { prepareMarkdownForTelegram, telegramSendMessage } from '../utils/telegram';

const isDevMode = process.env.NODE_ENV === 'development';

type ExpectedBody = {
  contact: string;
  text: string;
};

export async function POST(request: Request) {
  const jsonData = await request.json();
  if (!validateJsonData(jsonData)) throw new Error('Invalid data format');

  const markdownMessage = prepareMarkdownForTelegram(`
${jsonData.text === '' ? '\\[No message\\]' : jsonData.text.trim()}
*Contact* · \`${jsonData.contact === '' ? '\\[No contact\\]' : jsonData.contact}\`${
    isDevMode ? '\n_Sent from Dev Mode_' : ''
  }
`);

  const sendResult = await telegramSendMessage({
    text: markdownMessage,
  });

  const sendResultJson = await sendResult.json();
  if (!sendResultJson.ok) {
    console.error('Unexpected error while sending to Telegram from /contact', sendResultJson);
    return new Response('Unexpected error', { status: 500 });
  }

  return new Response();
}

function validateJsonData(jsonData: any): jsonData is ExpectedBody {
  /** Allow having just one of those, but not skipping both fields. So the user can just send us his e-mail easily, or just text us without leaving any point of contact if they want. */
  if (!jsonData.contact && !jsonData.text) return false;

  return true;
}
