'use client';

import React from 'react';
import ChatMessage from './ChatMessage';
import ChatForm from './ChatForm';

const ChatClient = () => {
  return (
    <div className="flex flex-col w-full h-full relative">
      {/* メッセージエリア */}
      <div className="flex-grow overflow-auto bg-white p-4">
        <ChatMessage />
      </div>

      {/* 入力エリア */}
      <ChatForm />
    </div>
  );
};

export default ChatClient;
