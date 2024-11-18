"use client";

import React, { FormEvent, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import ChatClient from "./components/ChatClient";

// メッセージ
interface Message {
  role: string;
  content: string;
}

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



// ホーム
export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef(null);

  // Streamのフェッチ
  async function fetchStream(messages: Message[]) {
    try {
      // API呼び出し
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });
      if (!response.body) throw new Error("No response body");

      // Readerの準備
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      // ストリーミング
      let done = false;
      let chunk = "";
      let buffer = ""
      while (!done) {
        // 読み込み
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        // チャンクに分割
        chunk += decoder.decode(value, { stream: true });
        let boundary = chunk.indexOf("\n");
        while (boundary !== -1) {
          buffer += chunk.slice(3, boundary-1);
          chunk = chunk.slice(boundary + 1);
          console.log("11111:"+buffer);
          setOutput(buffer);
          boundary = chunk.indexOf("\n");
        }
      }
    } catch (e: any) {
      if (e.code === 'ECONNABORTED') {
        setError('タイムアウト: 15秒以内に回答が返ってきませんでした。');
      } else {
        setError('エラーが発生しました。');
      }
    } finally {
      setIsLoading(false);
    }
  }

  // 送信ボタン押下時に呼ばれる
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setIsLoading(true);
    setError('');
    
    try {
      fetchStream([{ role: "user", content: input }]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* <!-- チャットヘッダー --> */}
      <div className="p-3 bg-gray-800 text-white">
        <h1 className="text-lg">ブログ作成支援</h1>
      </div>
      
      <ChatClient />
      
    </div>
  );
}
