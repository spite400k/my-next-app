'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { chatLogState } from '../../state/chatLogState';
import { loadingState } from '../../state/loadingState';
import styles from './css/scrolldown.module.css'
import FloatingActionMenuAccordion from '../button/floating/FloatingActionMenuAccordion';
import ActionButton from '../button/ActionButton';
import { MessageType } from '../../type/MessageType';
import MultiLineBody from './MultiLineBody';
import ColorfulRobotFace from '../icons/ColorfulRobotFace';

// チャットメッセージを表示するコンポーネント
const ChatMessage = () => {
  // チャットログを管理
  const [chatLog] = useRecoilState(chatLogState)
  // ローディング状態を管理
  const isLoading = useRecoilValue(loadingState);
  // スクロール位置を管理
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  // メッセージの末尾を参照するためのref
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  // チャットコンテナのref
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // 新しいメッセージが追加されるたびに、下部にスクロール
  useEffect(() => {
    // メッセージが追加されたら、下部にスクロール
    if (!isScrolled && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatLog, isScrolled]);

  // スクロール位置を監視する関数
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      // 下部から少し離れている場合にのみ、スクロールダウンボタンを表示
      setIsScrolled(scrollHeight - scrollTop > clientHeight + 50);
    }
  };
  // スクロールダウンボタンのクリック
  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setIsScrolled(false); // スクロール後にボタンを非表示にする
    }
  };


  // スクロールバーを自動で非表示
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  // スクロールが止まっているかどうかを監視
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      setIsScrolling(!isScrolling);

      // スクロールが止まってから2秒後にスクロールバーを消す
      timeoutId = setTimeout(() => {
        setIsScrolling(!isScrolling);
      }, 2000);
    };
    // スクロールイベントを監視
    window.addEventListener('scroll', handleScroll);

    return () => {
      // クリーンアップ
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <div
        className="flex flex-col bg-white rounded-lg p-4"
        ref={chatContainerRef}  
        onScroll={handleScroll}
      >
        {/* チャットログを表示 */}
        {chatLog.map((message:MessageType) => {
          return (
              // メッセージの表示
              <div key={message.id} 
                    className={`mb-2 p-2 rounded-lg sm:max-w-2xl shadow-lg ${
                      message.sender === 'user' ? 'flex bg-blue-300 text-white self-end' : 'flex self-start border border-gray-200' }`}>


                  {/* ユーザーのメッセージの場合はアイコンを表示*/}
                  {message.sender === 'other' && (
                    <div className="flex-shrink-0 m-2">
                      <ColorfulRobotFace/>
                    </div>
                  )}
                  
                  {/* メッセージの内容 */}
                  <div  className="relative rounded p-2 flex flex-col items-center justify-between">
                    <div className={'absolute -top-6  text-xs text-gray-500 ' + (message.sender === 'other' ? '-left-20' : 'right-0')}>
                      {message.time}
                    </div>

                    {/* actionボタン */}
                    {message.sender === 'other' && (
                      <ActionButton content={message.content}/>
                    )}
                    {/* メッセージの内容 */}
                    <div className={`text-sm markdown  ${
                        message.sender === 'user' ? 'whitespace-pre-wrap' : '' }`}>
                      {/* {message.content} */}
                      <MultiLineBody body={message.content} />
                    </div>
                </div>
              </div>
          )
        })}

        {/* ローディング中の表示 */}
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
        
        {/* スクロールのターゲット */}
        <div ref={messageEndRef} className="" />
        {/* フローティングアクションボタン */}
        <FloatingActionMenuAccordion/>
      </div>

      {/* スクロールダウンボタン（必要なときのみ表示） */}
      {isScrolled && (
        <div className="absolute bottom-1/4 left-2/4">
          <button
            onClick={scrollToBottom}
            className={styles.scroll_down}
          >
            <a href="#" ></a>
          </button>
        </div>
      )}
    </>
  )
}

export default ChatMessage