"use client";

import React, { useState, useEffect } from "react";
import { saveChatHistory, loadChatHistory } from "./ChatStorage";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatUI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");

  useEffect(() => {
    const fetchChatHistory = async () => {
      const chatHistory = await loadChatHistory();
      setMessages(chatHistory);
    };

    fetchChatHistory();
  }, []);

  useEffect(() => {
    saveChatHistory(messages);
  }, [messages]);

  const groupMessagesByDate = (messages: Message[]) => {
    const groupedMessages: { [key: string]: Message[] } = {};

    messages.forEach((message) => {
      const dateKey = message.timestamp.toDateString();
      if (!groupedMessages[dateKey]) {
        groupedMessages[dateKey] = [];
      }
      groupedMessages[dateKey].push(message);
    });

    return groupedMessages;
  };

  const handleMessageSend = () => {
    if (inputText.trim() === "") return;
    const newMessage: Message = {
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
    setInputText("");
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="chat-container">
      {Object.keys(groupedMessages).map((dateKey) => (
        <div key={dateKey} className="message-group">
          <div className="date-header">{dateKey}</div>
          <div className="message-container">
            {groupedMessages[dateKey].map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.isUser ? "user-message" : "bot-message"
                }`}
              >
                <div className="message-text">{message.text}</div>
                <div className="message-timestamp">
                  {message.timestamp.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <button onClick={handleMessageSend}>전송</button>
      </div>
    </div>
  );
};

export default ChatUI;
