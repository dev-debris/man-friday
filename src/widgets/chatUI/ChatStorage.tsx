import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../../shared/utils/Storage";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const saveChatHistory = (messages: Message[]) => {
  saveToLocalStorage({ key: "chatHistory", value: messages });
};

export const loadChatHistory = (): Message[] => {
  return loadFromLocalStorage("chatHistory") || [];
};
