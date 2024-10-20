'use client'
import React, { useRef, useState } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { chatLogState } from '../state/chatLogState'
import { loadingState } from '../state/loadingState'
import { chatInputState } from '../state/chatInputState'

const ChatForm = () => {

  // const [input, setInput] = useState<string>("")
  const [chatInput, setChatInput] = useRecoilState(chatInputState)
  const [chatLog, setChatLog] = useRecoilState(chatLogState)

  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null); // テキストエリアの参照を管理

  const defaultHeight  = 90;
  const [height, setHeight] = useState(defaultHeight); // テキストエリアの初期高さ

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    doSubmit();
  };
  const handleKeydown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    //e.preventDefault();

    if(e.key !== 'Enter') {
      return;
    }
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      doSubmit();

    }
  };

  const doSubmit=async ()=>{

    // 未入力の場合は何もしない
    if (chatInput.content.length <= 0 ) return;

    setIsLoading({ bool: true});

    const newId = chatLog.length > 0 ? chatLog[chatLog.length - 1].id + 1 : 1;

    const newUserMessage = { id: newId, content: chatInput.content, sender: "user" };
    const updatedMessages = [...chatLog, newUserMessage];
    setChatLog(updatedMessages);
    setChatInput({content: ""});
    // テキストエリアの高さを元に戻す
    if (textareaRef.current) {
        textareaRef.current.style.height = "auto"; // 高さをリセット
    }

    try {
      const res = await fetch(`/api/response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ prompt: chatInput.content, chatLog:updatedMessages }),
      });
      
      if (!res.ok) {
        throw new Error('Response error');
      }

      const result = await res.json();
      const newGptId = newId + 1;
      const newGptMessage = { id: newGptId, content: result.gptResponseMessage, sender: "other" };
      setChatLog([...updatedMessages, newGptMessage]);



    } catch (error) {
      console.error('Error fetching GPT response:', error);
    } finally {
      setIsLoading({ bool: false });
    }


  }
  const [isExpanded, setIsExpanded] = useState(false); 

  const handleDisplayAll = () => {

    if (isExpanded) {
      setHeight(defaultHeight);
      setIsExpanded(false);
    } else {
      // テキストエリアの高さを動的に調整する（自動リサイズ）
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"; // リセット
        // textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 内容に応じて高さを調整
        // 改行に合わせて高さを変える
        if (textareaRef.current.scrollHeight < 600) {
          // textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
          setHeight(textareaRef.current.scrollHeight);
        } else {
          // textareaRef.current.style.height = 600 + 'px';
          setHeight(600);
        }
      }
      setIsExpanded(true);
    }

  };


  const isResizing = useRef(false);
  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    setIsExpanded(true);

    const initialY = e.clientY;
    const initialHeight = height;

    const resizeTextarea = (moveEvent: MouseEvent) => {
      if (isResizing.current) {
        const newHeight = initialHeight - (moveEvent.clientY - initialY);
        if (newHeight > 50) { // 最小高さを50pxに設定
          setHeight(newHeight);
        }
      }
    };

    const stopResizing = () => {
      isResizing.current = false;
      window.removeEventListener('mousemove', resizeTextarea);
      window.removeEventListener('mouseup', stopResizing);
    };

    window.addEventListener('mousemove', resizeTextarea);
    window.addEventListener('mouseup', stopResizing);
  };

  return (
    <form onSubmit={handleSubmit} className="relative bottom-0 w-full p-3 bg-gray-200 flex justify-between items-center">
      {/* 上部リサイズハンドル */}
      <div
        className="absolute top-0 left-0 w-full h-1 cursor-ns-resize bg-gray-300"
        onMouseDown={startResizing}
      />
      <textarea
        // type="text"
        value={chatInput.content}
        onChange={(e) => { setChatInput({ content: e.target.value }) }}
        // onInput={handleInput}
        onKeyDown={(e)=>handleKeydown(e)} 
        className="w-full p-2 mr-2 rounded focus:outline-none text-gray-800 resize-none" 
        placeholder="メッセージを入力...  ctrl+Enterでも送信できます"
        ref={textareaRef}
        style={{ height: `${height}px` }}
      />
      <div className='flex'>
        <div className="m-auto mr-3 bg-blue-200 hover:bg-blue-300 text-white font-bold py-2 px-2 rounded w-24"
          onClick={handleDisplayAll}>
          全部表示
        </div>
        <button disabled={isLoading.bool} type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-24">
          送信
        </button>
      </div>

    </form>
  )
}

export default ChatForm