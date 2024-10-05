'use client'

import React from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'
import ChatMessage from './ChatMessage'
import ChatForm from './ChatForm'

const ChatClient = () => {

  return (
    <RecoilRoot >
        {/* <!-- メッセージエリア --> */}
        <div className="mx-auto w-full flex flex-col  h-screen overflow-hidden bg-white rounded-lg shadow p-1 mb-2 gap-4 lg:gap-6">
          <ChatMessage />
        </div>

        {/* <!-- テキスト入力エリア --> */}
        <ChatForm />


    </RecoilRoot>
  )
}

export default ChatClient