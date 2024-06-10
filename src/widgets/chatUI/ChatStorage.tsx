import { db } from "../../firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const CHAT_COLLECTION = "chats";

const getDateKey = (date: Date): string => {
  return date.toDateString();
};

export const saveChatHistory = async (messages: Message[]) => {
  try {
    const groupedMessages: { [key: string]: Message[] } = {};

    messages.forEach((message) => {
      const dateKey = getDateKey(message.timestamp);
      if (!groupedMessages[dateKey]) {
        groupedMessages[dateKey] = [];
      }
      groupedMessages[dateKey].push(message);
    });

    for (const dateKey in groupedMessages) {
      const chatDocRef = doc(collection(db, CHAT_COLLECTION), dateKey);
      await setDoc(chatDocRef, { messages: groupedMessages[dateKey] });
    }
  } catch (error) {
    console.error("Error saving chat history: ", error);
    throw error;
  }
};

export const loadChatHistory = async (): Promise<Message[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, CHAT_COLLECTION));
    const allMessages: Message[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const messages = data.messages.map((msg: any) => ({
        ...msg,
        timestamp: (msg.timestamp as Timestamp).toDate(),
      }));
      allMessages.push(...messages);
    });
    return allMessages;
  } catch (error) {
    console.error("Error loading chat history: ", error);
    throw error;
  }
};
