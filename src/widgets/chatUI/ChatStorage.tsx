import { saveToLocalStorage, loadFromLocalStorage } from '../../shared/utils/storage';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const CHAT_HISTORY_KEY_PREFIX = 'chatHistory_';

const getDateKey = (date: Date): string => {
  return date.toDateString();
};

export const saveChatHistory = (messages: Message[]) => {
  const groupedMessages: { [key: string]: Message[] } = {};

  messages.forEach(message => {
    const dateKey = getDateKey(message.timestamp);
    if (!groupedMessages[dateKey]) {
      groupedMessages[dateKey] = [];
    }
    groupedMessages[dateKey].push(message);
  });

  Object.keys(groupedMessages).forEach(dateKey => {
    saveToLocalStorage({ key: `${CHAT_HISTORY_KEY_PREFIX}${dateKey}`, value: groupedMessages[dateKey] });
  });
};

export const loadChatHistory = (): Message[] => {
  const allMessages: Message[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(CHAT_HISTORY_KEY_PREFIX)) {
      const messagesForDate = loadFromLocalStorage(key);
      allMessages.push(...messagesForDate);
    }
  }

  return allMessages;
};