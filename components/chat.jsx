"use client";

import { useEffect, useState } from "react";
import { ChatInput } from "@/components/chat-input";
import { ChatMessages } from "@/components/chat-messages";

export const ChatContainer = () => {
  //all messages saved in local storage
  const [messages, setMessages] = useState([]);

  // Load messages from localStorage when the component mounts
  useEffect(() => {
    const savedMessages = localStorage.getItem('chat-messages');
    if (savedMessages.length !== 0) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);
  //save messages to local storage
  useEffect(() => {
    localStorage.setItem("chat-messages", JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async (message) => {
    //1. display user message (add to the chat container)
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, type: "user" },
    ]);
    //2.get response from server API , and display it
    try {
      const response = await fetch(
        `/api/query?q=${encodeURIComponent(message)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      //display response
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.response, type: "bot" },
      ]);
    } catch (e) {
      console.error("Error fetching chatbot response:", e);
      // Optionally display an error message
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error getting response from chatbot.", type: "bot" },
      ]);
    }
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4">
        <ChatMessages  messages={messages} />
      </div>
      
      <div className="w-full p-4 border-t border-gray-200 flex-shrink-0">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};
