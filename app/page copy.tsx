"use client";

import React, { FormEvent, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

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
    <div className="mx-auto my-16 min-w-1/2 max-w-2xl px-4">
       <div className="flex h-full w-full bg-white rounded-lg shadow-lg">
          <div className="w-1/4 bg-gray-800 p-4 flex flex-col">
            <h2 className="text-white text-lg mb-4">チャットリスト</h2>
            <ul>
              <li className="text-white">グループ 1</li>
              <li className="text-white">グループ 2</li>
            </ul>
          </div>
          <div className="flex-1 flex flex-col bg-gray-100">
            <div className="flex-1 overflow-y-auto p-4">
              {error && <div className="mt-4 text-red-500">{error}</div>}
              {output && (
              <div className="markdown" >
                  <div className="font-medium leading-6 text-lg text-gray-900 pb-2">回答：</div>
                  <MultiLineBody body={output} />
                </div>
              )}
              
            </div>

            <form onSubmit={handleSubmit} className="p-4 flex items-center bg-white border-t border-gray-300">
              <input
                className="flex-1 p-2 border border-gray-300 rounded-lg"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="メッセージを入力"
              />
              <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg" type="submit">
                送信
              </button>
            </form>
          </div>
        </div>
    </div>
  );
}
