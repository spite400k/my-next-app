'use client';

import React, { useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { chatState } from '@/lib/states/chatState';
import TextareaAutosize from 'react-textarea-autosize';
import { Mic, MicOff, Send } from 'lucide-react';

const ChatForm = () => {
  const [input, setInput] = useState('');
  const [chats, setChats] = useRecoilState(chatState);
  const [listening, setListening] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const handleSend = async () => {
    if (!input.trim() || isSending) return;

    const userMessage = { text: input, sender: 'user' as const };
    setChats(prev => [...prev, userMessage]);
    setInput('');
    setIsSending(true);

    try {
      // GPT APIへリクエスト
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) throw new Error('Failed to fetch GPT response');

      const data = await res.json();

      const gptMessage = { text: data.reply, sender: 'ai' as const };
      setChats(prev => [...prev, gptMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage = { text: 'エラーが発生しました。', sender: 'ai' as const };
      setChats(prev => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
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

      recognition.onerror = (e: any) => {
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
      <button onClick={toggleMic} className="text-gray-600 hover:text-black">
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
        disabled={isSending}
      />
      <button
        onClick={handleSend}
        className="text-blue-500 hover:text-blue-700"
        disabled={isSending}
      >
        <Send />
      </button>
    </div>
  );
};

export default ChatForm;
