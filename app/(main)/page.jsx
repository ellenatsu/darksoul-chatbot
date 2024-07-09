import React from 'react'
import { ChatInput } from '@/components/chat-input';
import { ChatMessages } from '@/components/chat-messages';


const HomePage = () => {
  return (
    <div className='bg-yellow-100 flex flex-col justify-between items-center min-h-screen w-full'>
        <div className='p-2 mt-10'>Dark Souls Chatbot</div>
        <ChatMessages />
        <div className='w-full p-4 border-t border-gray-200 flex'>
          <ChatInput />
        </div>
        
    </div>
  )
}

export default HomePage;