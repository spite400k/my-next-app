import React from 'react';

type Props = {
  text: string;
  sender: 'user' | 'ai';
};

const ChatMessage = ({ text, sender }: Props) => {
  const isUser = sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-[70%] whitespace-pre-wrap ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;
