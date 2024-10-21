'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { chatLogState } from '../state/chatLogState';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { loadingState } from '../state/loadingState';
import AnchorTag from './atoms/AnchorTag';
import CodeBlock from './atoms/CodeBlock';
import styles from './css/scrolldown.module.css'
import FloatingActionMenuAccordion2 from './button/FloatingActionMenuAccordion2';

type MessageType = {
  id: number;
  content: string;
  sender: string;
};

// マルチラインのメッセージを表示するコンポーネント
const MultiLineBody = ({ body }: { body: string }) => {
  // マルチラインのメッセージを改行で分割して表示
  const texts = body.split('\\n\\n').map((item, index) => {
    console.log(item);

    // マークダウンの改行コードを変換
    item = item.replace(/\\n/g, '\n');
    // マークダウンのリンクを変換
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

// チャットメッセージを表示するコンポーネント
const ChatMessage = () => {
  // チャットログを管理
  const [chatLog, setChatLog] = useRecoilState(chatLogState)
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
      setIsScrolling(true);

      // スクロールが止まってから2秒後にスクロールバーを消す
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
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
        className="flex flex-col overflow-y-auto"
        ref={chatContainerRef}  
        onScroll={handleScroll}
      >
        {/* チャットログを表示 */}
        {chatLog.map((message:MessageType) => {
          return (
              // メッセージの表示
              <div key={message.id} 
                    className={`mb-2 p-2 rounded-lg sm:max-w-2xl ${
                      message.sender === 'user' ? 'flex bg-blue-300 text-white self-end' : 'flex self-start' }`}>
                  {/* ユーザーのメッセージの場合はアイコンを表示*/}
                  {message.sender === 'other' && (
                    <div className="flex-shrink-0 mr-2">
                      <div className="h-8 w-8 bg-black rounded-full" /> {/* アイコンの代わり */}
                    </div>
                  )}
                  {/* メッセージの内容 */}
                  <div  className="rounded p-2">
                    <div className={`text-sm markdown  ${
                        message.sender === 'user' ? 'whitespace-pre' : '' }`}>
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
        {/* <FloatingActionMenu /> */}
        {/* <FloatingActionMenuAccordion/> */}
        <FloatingActionMenuAccordion2/>
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