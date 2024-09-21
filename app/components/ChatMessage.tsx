'use client'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { chatLogState } from '../state/chatLogState';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { loadingState } from '../state/loadingState';

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
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{item}</ReactMarkdown>
      </React.Fragment>
    );
  });
  return <div>{texts}</div>;
};

const ChatMessage = () => {
  const [chatLog, setChatLog] = useRecoilState(chatLogState)
  const isLoading = useRecoilValue(loadingState);
  return (
    <>
      {chatLog.map((message:MessageType) => {
        return (
          <>
            <div key={message.id} 
                  className={`mb-2 p-2 rounded-lg max-w-2xl ${
                    message.sender === 'user' ? 'flex bg-blue-300 text-white self-end' : 'flex bg-gray-300 self-start' }`}>
              
              {message.sender === 'other' && (
                <div className="flex-shrink-0 mr-2">
                  <div className="h-8 w-8 bg-black rounded-full" /> {/* アイコンの代わり */}
                </div>
              )}
              <div  className={`rounded p-2`}>
                <div className="text-sm markdown">
                  {/* {message.content} */}
                  <MultiLineBody body={message.content} />
                </div>
              </div>
            </div>
          
          </>
        )
      })}

      {isLoading.bool ? (
        <div className="font-medium leading-6 text-lg text-indigo-700 pb-2">読み込み中...</div>
      ) : (
        <></>
      )}
    </>
  )
}

export default ChatMessage