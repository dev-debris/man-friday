import { db } from "../../firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const CHAT_COLLECTION = "chats";

export const saveChatHistory = async (messages: Message[]) => {
  const groupedMessages: { [key: string]: Message[] } = {};

  messages.forEach((message) => {
    const dateKey = message.timestamp.toDateString();
    if (!groupedMessages[dateKey]) {
      groupedMessages[dateKey] = [];
    }
    groupedMessages[dateKey].push(message);
  });

  for (const dateKey in groupedMessages) {
    const chatDocRef = doc(collection(db, CHAT_COLLECTION), dateKey);
    await setDoc(chatDocRef, { messages: groupedMessages[dateKey] });
  }
};

export const loadChatHistory = async (): Promise<Message[]> => {
  const querySnapshot = await getDocs(collection(db, CHAT_COLLECTION));
  const allMessages: Message[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    allMessages.push(...data.messages);
  });
  return allMessages;
};
