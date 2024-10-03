'use client'
import React, { useRef, useState } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { chatLogState } from '../state/chatLogState'
import { loadingState } from '../state/loadingState'

const ChatForm = () => {

  const [input, setInput] = useState<string>("")
  const [chatLog, setChatLog] = useRecoilState(chatLogState)

  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null); // テキストエリアの参照を管理


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
    if (input.length <= 0 ) return;

    setIsLoading({ bool: true});

    const newId = chatLog.length > 0 ? chatLog[chatLog.length - 1].id + 1 : 1;

    const newUserMessage = { id: newId, content: input, sender: "user" };
    const updatedMessages = [...chatLog, newUserMessage];
    setChatLog(updatedMessages);
    setInput("");
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
        body: JSON.stringify({ prompt: input, chatLog:updatedMessages }),
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

    const handleInput = () => {
    // テキストエリアの高さを動的に調整する（自動リサイズ）
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // リセット
      // textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 内容に応じて高さを調整
      // 改行に合わせて高さを変える
      if(textareaRef.current.scrollHeight < 300){
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
      }else{
        textareaRef.current.style.height = 300 + 'px';
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" bottom-0 w-full p-3 bg-gray-200 flex justify-between items-center">
      <textarea
        // type="text"
        value={input}
        onChange={(e) => {setInput(e.target.value) }}
        onInput={handleInput}
        onKeyDown={(e)=>handleKeydown(e)} 
        className="w-full p-2 mr-2 rounded focus:outline-none text-gray-800" 
        placeholder="メッセージを入力...  ctrl+Enterでも送信できます"
        ref={textareaRef}
      />
      <button disabled={isLoading.bool} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        送信
      </button>
    </form>
  )
}

export default ChatForm