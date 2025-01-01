'use client'
import React, { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { chatLogState } from '../../state/chatLogState'
import { loadingState } from '../../state/loadingState'
import { chatInputState } from '../../state/chatInputState'
import { FaMicrophoneLines } from 'react-icons/fa6'

/// グローバルに型を定義（型がない場合の対応）
interface CustomWindow extends Window {
  webkitSpeechRecognition?: any;
}
declare const window: CustomWindow;

const ChatForm = () => {

  // const [input, setInput] = useState<string>("")
  // チャット欄の入力値を管理
  const [chatInput, setChatInput] = useRecoilState(chatInputState)
  // チャットログを管理
  const [chatLog, setChatLog] = useRecoilState(chatLogState)
  //  ローディング状態を管理
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  

  // テキストエリアの状態を管理する
  const textareaRef = useRef<HTMLTextAreaElement | null>(null); // テキストエリアの参照を管理
  const defaultHeight  = 90; // テキストエリアの初期高さ
  const [height, setHeight] = useState(defaultHeight); // テキストエリアの初期高さのステート

  // チャット入力欄のフォームの送信処理(ボタン押下)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    doSubmit();
  };
  // チャット入力欄のフォームの送信処理(Enter押下)
  const handleKeydown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {

    // Enterキー以外は何もしない
    if(e.key !== 'Enter') {
      return;
    }
    // Enterキーが押されたとき、かつ、Ctrlキーが押されている場合
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      doSubmit();
    }
  };

  // チャット送信処理
  const doSubmit = async ()=>{

    // 未入力の場合は何もしない
    if (!chatInput.content.trim()) return ;
    if (chatInput.content.length <= 0 ) return;

    // ローディング中は何もしない
    setIsLoading({ bool: true});

    // チャットログにユーザーのメッセージを追加
    // 送信対象のメッセージのIDを生成
    const newId = chatLog.length > 0 ? chatLog[chatLog.length - 1].id + 1 : 1;

    // 送信対象のメッセージを生成
    const newUserMessage = {
      id: newId,
      content: chatInput.content,
      sender: 'user',
      time: new Date().toLocaleTimeString(), // クライアントサイドでのみ処理
    };

    // 既存のチャットログに追加
    const updatedMessages = [...chatLog, newUserMessage];
    setChatLog(updatedMessages);
 
    // チャット入力欄をリセット
    setChatInput({content: ""});

    // テキストエリアの高さを元に戻す
    if (textareaRef.current) {
        textareaRef.current.style.height = "auto"; // 高さをリセット
    }

    // GPT-3にリクエストを送信
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

      // GPT-3からのレスポンスを取得
      const result = await res.json();
      // GPT-3からのレスポンスをチャットログに追加
      const newGptMessage = {
        id: newId + 1,
        content: result.gptResponseMessage,
        sender: 'other',
        time: new Date().toLocaleTimeString(),
      };
      setChatLog((prevLog) => [...prevLog, newGptMessage]);

    } catch (error) {
      console.error('Error fetching GPT response:', error);
    } finally {
      // ローディングを終了する
      setIsLoading({ bool: false });
    }
  }
  
  // テキストエリアの全文表示
  // テキストエリアが拡張されているかどうかを管理するステート
  const [isExpanded, setIsExpanded] = useState(false); 
  // テキストエリアの全文表示を切り替える
  const handleDisplayAll = () => {

    if (isExpanded) {
      // テキストエリアの高さを元に戻す
      setHeight(defaultHeight);
      // テキストエリアが拡張状態でないことを設定
      setIsExpanded(false);
    } else {
      
      // テキストエリアの高さを動的に調整する（自動リサイズ）
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"; // リセット
        // 改行に合わせて高さを変える
        // テキストエリアの高さが600pxを超えないようにする
        if (textareaRef.current.scrollHeight < 600) {
          setHeight(textareaRef.current.scrollHeight);
        } else {
          setHeight(600);
        }
      }
      // テキストエリアが拡張状態であることを設定
      setIsExpanded(true);
    }

  };

  // テキストエリアのリサイズ処理
  // テキストエリアのリサイズ中かどうかを管理するステート
  const isResizing = useRef(false);
  // テキストエリアのリサイズを開始する
  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    // リサイズ中であることを設定
    isResizing.current = true;
    // テキストエリアが拡張状態であることを設定
    setIsExpanded(true);

    // マウスの初期位置、テキストエリアの初期高さを取得
    const initialY = e.clientY;
    const initialHeight = height;

    // テキストエリアのリサイズ処理
    const resizeTextarea = (moveEvent: MouseEvent) => {
      // リサイズ中であれば、マウスの移動に合わせてテキストエリアの高さを変更
      if (isResizing.current) {
        const newHeight = initialHeight - (moveEvent.clientY - initialY);
        // 最小高さを50pxに設定
        if (newHeight > 50) {
          setHeight(newHeight);
        }
      }
    };

    // テキストエリアのリサイズを終了する
    const stopResizing = () => {
      // リサイズ中でないことを設定
      isResizing.current = false;
      // リサイズ処理を終了
      window.removeEventListener('mousemove', resizeTextarea);
      window.removeEventListener('mouseup', stopResizing);
    };

    // リサイズ処理を開始
    window.addEventListener('mousemove', resizeTextarea);
    window.addEventListener('mouseup', stopResizing);
  };

  // 音声認識に関連するステート
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 音声認識を開始する
  const startListening = () => {
    if (!window.webkitSpeechRecognition) {
      setError('このブラウザは音声認識をサポートしていません。Chromeをお試しください。')
      return
    }

    const recognition = new window.webkitSpeechRecognition()
    recognition.lang = 'ja-JP'
    recognition.interimResults = false
    recognition.continuous = false

    recognition.onstart = () => {
      setIsListening(true)
      setError(null)
    }

    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript
      setChatInput({ content: chatInput.content + result }) // 音声入力を追加
      setIsListening(false)
    }

    recognition.onerror = (event: any) => {
      setError(`エラー: ${event.error}`)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }


  return (
    <form 
      className="fixed bottom-0 w-[calc(100%-16rem)] p-3 bg-gray-200 flex justify-between items-center"
      style={{ marginTop: '4rem' }}  // ヘッダーの高さ分を考慮
      onSubmit={handleSubmit} 
    >
      {/* 上部リサイズハンドル */}
      <div
        className="absolute top-0 left-0 w-full h-1 cursor-ns-resize bg-gray-300"
        onMouseDown={startResizing}
      />
      <textarea
        value={chatInput.content}
        onChange={(e) => { setChatInput({ content: e.target.value }) }}
        onKeyDown={(e) => handleKeydown(e)} 
        className="w-full p-2 mr-2 rounded focus:outline-none text-gray-800 resize-none"
        placeholder="メッセージを入力...  ctrl+Enterでも送信できます"
        ref={textareaRef}
        style={{ height: `${height}px` }}
      />
      <div className='flex'>
        <div className='flex flex-col'>
          <button
            type="button"
            onClick={startListening}
            className={`m-auto mr-1 mb-1 ${
              isListening ? 'bg-gray-300' : 'bg-green-500 hover:bg-green-600'
            } text-white font-bold py-3 rounded w-24`}
            disabled={isListening || isLoading.bool}
          >
            {isListening ? '認識中...' 
              :     
              <div className="flex items-center justify-center ">
                <FaMicrophoneLines className="text-xl" />
              </div>
            }
          </button>
          <button 
            type="button"
            className="m-auto mr-1 bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 rounded w-24"
            onClick={handleDisplayAll}>
            {'全部表示'}
          </button>
        </div>
        <button 
          disabled={isListening || isLoading.bool} 
          type="submit" 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          {'送信'}
        </button>
      </div>
    </form>
  );
  
}

export default ChatForm