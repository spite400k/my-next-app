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

  // 🔄 自動スクロール
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  // ⬇️ 初期ロード
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

  // ⬆️ 保存
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(chats));
  }, [chats]);

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      {/* チャット表示エリア */}
      <div className="flex-grow overflow-y-auto px-2 sm:px-4 py-2 sm:py-4">
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

      {/* フォーム（常に下部） */}
      <div className="border-t border-gray-300 px-2 sm:px-4 py-2 bg-white">
        <ChatForm />
      </div>
    </div>
  );
};

export default ChatClient;
