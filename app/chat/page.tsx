import React from 'react'
import ChatClient from '../components/ChatClient'

// https://zenn.dev/jinku/articles/4d8dd0855e21aa

async function ChatPage() {

  return (
    <div className="flex flex-col h-screen">
      {/* <!-- チャットヘッダー --> */}
      <div className="p-3 bg-gray-800 text-white">
        <h1 className="text-lg">チャットルーム</h1>
      </div>
      
      <ChatClient />
      
    </div>
  )
}

export default ChatPage
