import React from "react";

const SideBar = () => {
  return (
    <div className="space-y-4 flex flex-col justify-between items-center h-full w-full py-3 text-white">
      <h1>Hello! It's your Game Chatbot</h1>
      <button className="border-2 rounded-lg bg-transparent p-4 m-4">
          + new chat 
      </button>
      <div className="p-2 text-md">
        Some conversations here..(to be continued..)
      </div>
      <div className="text-sm p-2">
        Created by Ellen  (User Profile Avatar gonna be here)
      </div>
    </div>
  );
};

export default SideBar;
