'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { chatLogState } from '../../state/chatLogState';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { loadingState } from '../../state/loadingState';
import AnchorTag from '../atoms/AnchorTag';
import CodeBlock from '../atoms/CodeBlock';
import styles from './css/scrolldown.module.css'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FloatingActionMenuAccordion2 from '../button/FloatingActionMenuAccordion2';
import { ClipboardIcon } from '@heroicons/react/24/solid';
import { TfiWrite } from 'react-icons/tfi';
import { chatInputState } from '@/app/state/chatInputState';
import RobotFace from '../icons/robot';


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

  // コピーした
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    setCopiedMessage(text);
    setTimeout(() => setCopiedMessage(null), 2000);
  };


  // チャット入力にセットする
  const [chatInput, setChatInput] = useRecoilState(chatInputState)
  const handleWiteBlog = (word: string) => {
    word = "次の内容でブログを作成する　自然な文体で書いて　" + word;
    
    setChatInput({ content: word });
  };

  return (
    <>
      <div
        className="flex flex-col"
        ref={chatContainerRef}  
        onScroll={handleScroll}
      >
        {/* チャットログを表示 */}
        {chatLog.map((message:MessageType) => {
          return (
              // メッセージの表示
              <div key={message.id} 
                    className={`mb-2 p-2 rounded-lg sm:max-w-2xl ${
                      message.sender === 'user' ? 'flex bg-blue-300 text-white self-end' : 'flex self-start border border-red-400' }`}>
                  {/* ユーザーのメッセージの場合はアイコンを表示*/}
                  {message.sender === 'other' && (
                    <div className="flex-shrink-0 m-2">
                      {/* <FaceIcon /> */}
                      <RobotFace />
                    </div>
                  )}
                  {/* メッセージの内容 */}
                  <div  className="rounded p-2 flex flex-col items-center justify-between">
                    
                    {/* コピーするボタン */}
                    {message.sender === 'other' && (
                      <div className="relative flex flex-row justify-end w-full">

                        {/* ブログを書くボタン */}
                        <div className="group ">
                          <button className='p-3 rounded-md hover:bg-gray-200 transition' onClick={() => handleWiteBlog(message.content)}>
                            <TfiWrite />
                          </button>
                          <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                            この内容でブログを作成する
                          </div>
                        </div>

                        {/* コピーするボタン */}
                        <div className="group ">
                          <CopyToClipboard text={message.content} onCopy={() => handleCopy(message.content)}>
                            <button className="p-2 rounded-md hover:bg-gray-200 transition">
                              <ClipboardIcon className="h-6 w-6 text-gray-500 group-hover:text-gray-700" />
                            </button>
                          </CopyToClipboard>
                          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                            コピーする
                          </div>
                        </div>
                      </div>
                    )}
                    

                    <div className={`text-sm markdown  ${
                        message.sender === 'user' ? 'whitespace-pre-wrap' : '' }`}>
                      {/* {message.content} */}
                      <MultiLineBody body={message.content} />
                    </div>
 
                   
                    {/* Copied Message Notification */}
                    {copiedMessage && (
                      <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg animate-fade-in-out">
                        コピーしました！
                      </div>
                    )}
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