'use client';

import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { chatState } from '@/lib/states/chatState';

import ChatForm from './ChatForm';
import {ChatMessage} from './ChatMessage';


const ChatClient = () => {
  const chats = useRecoilValue(chatState);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  return (
    <div className="flex flex-col h-full max-h-screen">
      <div className="flex-grow overflow-y-auto p-4">
        {chats.map((chat, index) => (
          <ChatMessage key={index} text={chat.text} sender={chat.sender} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* 入力エリア */}
      <ChatForm />
    </div>
  );
};

export default ChatClient;
