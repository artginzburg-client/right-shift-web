import { prepareMarkdownForTelegram, telegramSendMessage } from '../utils/telegram';

const isDevMode = process.env.NODE_ENV === 'development';

type ExpectedBody = {
  email: string;
  answers: (string | boolean | string[])[];
  cost: number;
};

export async function POST(request: Request) {
  const jsonData = await request.json();
  if (!validateJsonData(jsonData)) throw new Error('Invalid data format');

  const answersAsObject = {
    Subject: jsonData.answers[0],
    Design: jsonData.answers[1],
    Integrations: jsonData.answers[2] ? 'Yes' : 'No',
    Options: (jsonData.answers[3] as string[]).join(', '),
  };

  const markdownMessage = prepareMarkdownForTelegram(`
    ${Object.entries(answersAsObject)
      .map(([heading, value]) => `*${heading}* ${value}`)
      .join('\n')}

*Cost* · \`$${jsonData.cost}\`
*E-mail* · \`${jsonData.email}\`${isDevMode ? '\n_Sent from Dev Mode_' : ''}
  `);

  const sendResult = await telegramSendMessage({
    text: markdownMessage,
  });

  const sendResultJson = await sendResult.json();
  if (!sendResultJson.ok) {
    console.error('Unexpected error while sending to Telegram from /calc', sendResultJson);
    return new Response('Unexpected error', { status: 500 });
  }

  return new Response();
}

function validateJsonData(jsonData: any): jsonData is ExpectedBody {
  if (!jsonData.answers || !jsonData.email) return false;

  if (
    typeof jsonData.answers[0] !== 'string' ||
    typeof jsonData.answers[1] !== 'string' ||
    typeof jsonData.answers[2] !== 'boolean' ||
    !Array.isArray(jsonData.answers[3])
  )
    return false;

  if (!jsonData.cost) return false;

  return true;
}
