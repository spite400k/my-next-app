'use client';

import React, { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { chatState } from '@/lib/states/chatState';

import ChatForm from './ChatForm';
import { ChatMessage } from './ChatMessage';

const LOCAL_KEY = 'chatMessages';

const ChatClient = () => {
  const [chats, setChats] = useRecoilState(chatState);
  const bottomRef = useRef<HTMLDivElement>(null);

  // 🔄 チャットの自動スクロール
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  // ⬇️ ローカルストレージから初回読み込み
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setChats(parsed);
        }
      } catch (err) {
        console.error('ローカルストレージ読み込み失敗:', err);
      }
    }
  }, [setChats]);

  // ⬆️ chats変更時に保存
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(chats));
  }, [chats]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-grow overflow-y-auto p-4">
        {chats.map((chat, index) => (
          <ChatMessage
            key={index}
            text={chat.text}
            sender={chat.sender}
            timestamp={chat.timestamp}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* 入力エリア */}
      <ChatForm />
    </div>
  );
};

export default ChatClient;
