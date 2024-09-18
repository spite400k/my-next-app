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
      <div className="flex-grow overflow-auto p-6 space-y-5 styles.chat styles.border__chat">
          <ChatMessage />
      </div>
  
      {/* <!-- テキスト入力エリア --> */}
      <ChatForm />

    </RecoilRoot>
  )
}

export default ChatClient