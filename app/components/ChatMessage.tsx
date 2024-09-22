'use client'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { chatLogState } from '../state/chatLogState';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { loadingState } from '../state/loadingState';
import AnchorTag from './atoms/AnchorTag';
import CodeBlock from './atoms/CodeBlock';


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
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                a: AnchorTag,
                code: CodeBlock,              }}
            >{item}</ReactMarkdown>
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
            <div key={message.id} 
                  className={`mb-2 p-2 rounded-lg max-w-2xl ${
                    message.sender === 'user' ? 'flex bg-blue-300 text-white self-end' : 'flex self-start' }`}>
              
              {message.sender === 'other' && (
                <div className="flex-shrink-0 mr-2">
                  <div className="h-8 w-8 bg-black rounded-full" /> {/* アイコンの代わり */}
                </div>
              )}
              <div  className={`rounded p-2`}>
                <div className={`text-sm markdown  ${
                    message.sender === 'user' ? 'whitespace-pre' : '' }`}>
                  {/* {message.content} */}
                  <MultiLineBody body={message.content} />
                </div>
              </div>
            </div>
        )
      })}

      {isLoading.bool ? (
        <div className="mb-2 p-2 rounded-lg max-w-2xl flex self-start">  
          <div className="flex-shrink-0 mr-2">
            <div className="h-8 w-8 bg-black rounded-full" /> {/* アイコンの代わり */}
          </div>
          <div className="flex justify-start p-2" aria-label="読み込み中">
            <div className="font-medium leading-6 text-lg text-indigo-700 pb-2 pr-3">読み込み中</div>
            <div className="flex justify-center items-center pb-2">
              <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full"></div>
              <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full mx-4"></div>
              <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full"></div>
            </div>
          </div>        

        </div>
       ) : (
        <></>
      )} 
    </>
  )
}

export default ChatMessage