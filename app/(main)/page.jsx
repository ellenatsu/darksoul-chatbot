import React from 'react'

import { createVectorStore } from '@/utils/chromadbUtils';
import {ChatContainer} from '@/components/chat';


const HomePage = async () => {
  //init loading data to collection
  let loading = true;
  // try{
  //   // const docs = await testCSVLoader();
  //   // console.log({docs});
  //   loading = await createVectorStore();
  // }
  // catch(e){
  //   console.log("create vector store failed", e);
  // }
  return (
    <div className='bg-yellow-50 flex flex-col h-screen'>
        <div className='p-2 mt-2 text-center'>Dark Souls Chatbot</div>
        { !loading && <div className='p-2 mt-10'>Initalizing chatbot with game data, please wait...</div>}
        {loading && (
          <div className="flex-grow">
            <ChatContainer />
          </div>
        )}
    </div>
  )
}

export default HomePage
