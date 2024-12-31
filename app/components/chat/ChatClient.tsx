'use client';

import React from 'react';
import ChatMessage from './ChatMessage';
import ChatForm from './ChatForm';

const ChatClient = () => {
  return (
    <div className="flex flex-col h-full">
      {/* メッセージエリア */}
      <div className="flex-grow overflow-y-auto" style={{ height: 'calc(100vh - 4rem - 90px)' }}>
        <ChatMessage />
      </div>

      {/* 入力エリア */}
      <ChatForm />
    </div>
  );
};

export default ChatClient;
