"use client";

import React from "react";
import { useRef } from "react";
import { useChatScroll } from "@/hooks/use-chat-scroll";

//in this chatbot, i won't save any conversation data...
export const ChatMessages = ({messages}) => {
  // Refs
  const chatRef = useRef(null);
  const bottomRef = useRef(null);

  // Handling scroll behavior
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: ()=>{},
    shouldLoadMore: false,
    count: 0,
  });

  return (
    <div ref={chatRef} className="w-full flex flex-col gap-3 items-center overflow-y-auto">
      
      <div className="flex flex-col-reverse mt-auto">
      
        {messages.length === 0 && (<p className="p-4 text-xl mt-10">Hello! Start the chat with a question about Dark Soul!</p>) }
        {messages.length !== 0 && messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 m-2 rounded-lg ${
              message.type === 'user' ? 'bg-blue-200 self-end' : 'bg-gray-100 self-start'
            }`}
          >
            {message.type} : {message.text}
          </div>
        ))}
      
      </div>
      <div ref={bottomRef} />
    </div>
  );
};
