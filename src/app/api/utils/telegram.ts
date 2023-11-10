const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, NODE_ENV } = process.env;
const isDevMode = NODE_ENV === 'development';

validateTelegramIntegrationOrThrow();

type TelegramSendMessageData = {
  chat_id: number | string;
  text: string;
  /** @see https://core.telegram.org/bots/api#formatting-options */
  parse_mode: 'MarkdownV2' | 'HTML';
  /** Sends the message silently. Users will receive a notification with no sound. */
  disable_notification?: boolean;
};

type TelegramSendMessageArguments = Pick<TelegramSendMessageData, 'text' | 'disable_notification'>;

export function telegramSendMessage(data: TelegramSendMessageArguments) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN!}/sendMessage`;

  const body: TelegramSendMessageData = {
    chat_id: TELEGRAM_CHAT_ID!,
    parse_mode: 'MarkdownV2',
    disable_notification: isDevMode,
    ...data,
  };

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export function prepareMarkdownForTelegram(markdown: string) {
  return markdown.trim().replaceAll(/-|\(|\)|\!/g, '\\$&');
}

function validateTelegramIntegrationOrThrow() {
  if ((!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) && NODE_ENV !== 'test') {
    throw new Error('Telegram integration is not configured in the environment variables!');
  }
}
