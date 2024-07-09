"use client";

import React from "react";
import { useRef } from "react";
import { useChatScroll } from "@/hooks/use-chat-scroll";

//in this chatbot, i won't save any conversation data...
export const ChatMessages = () => {
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
    <div ref={chatRef} className="w-full flex-1 flex flex-col gap-3 items-center overflow-y-auto">
      <p>
        To be continue: curretnly won't save any previous conversation data.
      </p>
      <p className="p-4 text-xl mt-10">Hello! Start the chat with a question about Dark Soul!</p>
      <div className="flex flex-col-reverse mt-auto">Render messages</div>
      <div ref={bottomRef} />
    </div>
  );
};
