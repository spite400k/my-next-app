'use client'

import React from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'
import ChatMessage from './ChatMessage'
import ChatForm from './ChatForm'
import styles from './css/chat.module.css'

const ChatClient = () => {
  return (
    <RecoilRoot >
      {/* <!-- メッセージエリア --> */}
      <div className="flex flex-col flex-grow overflow-y-auto bg-white rounded-lg shadow p-4 mb-4">
          <ChatMessage />
      </div>
  
      {/* <!-- テキスト入力エリア --> */}
      <ChatForm />

    </RecoilRoot>
  )
}

export default ChatClient