'use client';

import React, { useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { chatState } from '@/lib/states/chatState';
import TextareaAutosize from 'react-textarea-autosize';
import { Mic, MicOff, Send, Loader2 } from 'lucide-react';

const ChatForm = () => {
  const [input, setInput] = useState('');
  const [, setChats] = useRecoilState(chatState);
  const [listening, setListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { text: input, sender: 'user' as const, timestamp: new Date().toISOString() };
    const loadingMessage = { text: '...', sender: 'ai' as const, timestamp: new Date().toISOString() }; // 仮のローディング表示

    setChats(prev => [...prev, userMessage, loadingMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      console.log('📦 API応答:', data); // ← ここ追加

      const botMessage = {
        text: data.reply || 'エラーが発生しました。',
        sender: 'ai' as const,
        timestamp: new Date().toISOString(), // タイムスタンプを追加
      };

      // 最後のローディングメッセージを差し替える
      setChats(prev => [
        ...prev.slice(0, -1), // 最後の「...」を除く
        botMessage,
      ]);
    } catch (error) {
      console.error('APIエラー:', error);
      setChats(prev => [
        ...prev.slice(0, -1),
        { text: 'エラーが発生しました。', sender: 'ai' , timestamp: new Date().toISOString() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleMic = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('音声認識はこのブラウザでサポートされていません。');
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
    } else {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'ja-JP';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + transcript);
      };

      recognition.onerror = (e: SpeechRecognitionEvent) => {
        console.error('音声認識エラー:', e);
        setListening(false);
      };

      recognition.onend = () => setListening(false);

      recognition.start();
      recognitionRef.current = recognition;
      setListening(true);
    }
  };

  return (
    <div className="flex items-end gap-2 p-4 border-t">
      <button onClick={toggleMic} className="text-gray-600 hover:text-black" disabled={isLoading}>
        {listening ? <MicOff /> : <Mic />}
      </button>

      <TextareaAutosize
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow resize-none border rounded px-3 py-2"
        minRows={1}
        maxRows={6}
        placeholder="メッセージを入力..."
        disabled={isLoading}
      />

      <button
        onClick={handleSend}
        className={`text-blue-500 hover:text-blue-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
      </button>
    </div>
  );
};

export default ChatForm;
