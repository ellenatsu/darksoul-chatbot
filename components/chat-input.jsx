import React, { useState } from 'react';

export const ChatInput = ({ onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.trim() !== '') {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex p-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow p-2 border border-gray-300 rounded-lg mr-4"
      />
      <button type="submit" className="p-2 bg-black text-white rounded-lg hover:bg-blue-600">
        Send
      </button>
    </form>
  );
}
