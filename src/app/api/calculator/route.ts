const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, NODE_ENV } = process.env;
const isDevMode = NODE_ENV === 'development';

type ExpectedBody = {
  email: string;
  answers: (string | boolean | string[])[];
  cost: number;
};

export async function POST(request: Request) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error('Telegram integration is not configured in the environment variables!');
  }

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
    chat_id: TELEGRAM_CHAT_ID,
    parse_mode: 'MarkdownV2',
    text: markdownMessage,
    disable_notification: isDevMode,
  });

  const sendResultJson = await sendResult.json();
  if (!sendResultJson.ok) {
    console.error('Unexpected error while sending to telegram chat', sendResultJson);
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

function telegramSendMessage(data: {
  chat_id: number | string;
  text: string;
  /** @see https://core.telegram.org/bots/api#formatting-options */
  parse_mode: 'MarkdownV2' | 'HTML';
  /** Sends the message silently. Users will receive a notification with no sound. */
  disable_notification?: boolean;
}) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

function prepareMarkdownForTelegram(markdown: string) {
  return markdown.trim().replaceAll(/-|\(|\)/g, '\\$&');
}
