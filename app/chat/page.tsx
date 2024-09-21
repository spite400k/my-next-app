import React from 'react'
import ChatClient from '../components/ChatClient'
import { RecoilRoot } from 'recoil'

// https://zenn.dev/jinku/articles/4d8dd0855e21aa

async function ChatPage() {

  return (
    <RecoilRoot>
      <div className="flex flex-col h-screen bg-gray-100 p-4">
        {/* <!-- チャットヘッダー --> */}
        <div className="p-3 bg-gray-800 text-white">
          <h1 className="text-lg">チャットルーム</h1>
        </div>
        
        <ChatClient />
        
      </div>
    </RecoilRoot>
  )
}

export default ChatPage
