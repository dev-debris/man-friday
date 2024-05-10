"use client";

import React, { useState } from "react";

interface Message {
  text: string;
  isUser: boolean;
}

const ChatUI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");

  const handleMessageSend = () => {
    if (inputText.trim() === "") return;
    const newMessage: Message = { text: inputText, isUser: true };
    setMessages([...messages, newMessage]);
    setInputText("");
  };

  return (
    <div className="chat-container">
      <div className="message-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.isUser ? "user-message" : "bot-message"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
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
