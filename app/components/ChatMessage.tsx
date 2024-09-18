'use client'
import React from 'react'
import { useRecoilState } from 'recoil';
import { chatLogState } from '../state/chatLogState';
import ReactMarkdown from 'react-markdown';
import styles from './css/chat.module.css'

type MessageType = {
  id: number;
  content: string;
  sender: string;
};

const MultiLineBody = ({ body }: { body: string }) => {
  const texts = body.split('\\n\\n').map((item, index) => {
    console.log(item);
    item = item.replace(/\\n/g, '\n');
    return (
      <React.Fragment key={index}>
        <ReactMarkdown>{item}</ReactMarkdown>
      </React.Fragment>
    );
  });
  return <div>{texts}</div>;
};

const ChatMessage = () => {
  const [chatLog, setChatLog] = useRecoilState(chatLogState)
  return (
    <>
      {chatLog.map((message:MessageType) => {
        return (
          <div 
	    key={message.id} 
	    className={`flex items-end ${message.sender === 'user' ? 'justify-end' : ''} styles.chat__icon`}>
            {message.sender === 'other' && (
              <div className="flex-shrink-0 mr-2">
                <div className="h-8 w-8 bg-gray-300 rounded-full" /> {/* アイコンの代わり */}
              </div>
            )}
            <div 
	     className={`rounded p-2 ${message.sender === 'user' ? 'bg-blue-200' : 'bg-gray-500'} styles.chat__text`}>
              <p className="text-sm markdown">
                {/* {message.content} */}
                <MultiLineBody body={message.content} />
                </p>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default ChatMessage