'use client'

import React from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'
import ChatMessage from './ChatMessage'
import ChatForm from './ChatForm'

const ChatClient = () => {

  return (
    <RecoilRoot >
      
      <div className='relative h-screen'>
        {/* <!-- メッセージエリア --> */}
        <div className="mx-auto w-full flex flex-col flex-grow bg-white rounded-lg shadow p-1 mb-2 gap-4 lg:gap-6 ">
          <ChatMessage />
        </div>

        {/* <!-- テキスト入力エリア --> */}
        <ChatForm />
      </div>

    </RecoilRoot>
  )
}

export default ChatClient