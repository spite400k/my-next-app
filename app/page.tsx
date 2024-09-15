"use client";

import React, { useState, FormEvent } from "react";

// メッセージ
interface Message {
  role: string;
  content: string;
}

// ホーム
export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <div>{output}</div>

      <div className="bg-gray-700 rounded-md md:flex md:items-center md:justify-between py-4 px-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-white">Next ChatBot</h2>
        </div>
      </div>
      <div className="px-4">
        <div className="py-8">
          <label
            htmlFor="email"
            className="block font-medium leading-6 text-lg text-gray-900 pb-2"
          >
            質問フォーム：
          </label>
          <div className="mt-2">
            <textarea
              id="question"
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="質問したいことを入力してください"
              maxLength={500}
              rows={5}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end mb-8">
          <button
            className="rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={isLoading || input.length === 0}
            onClick={handleSubmit}
          >
            質問する
          </button>
        </div>
            {error && <div className="mt-4 text-red-500">{error}</div>}
            {output && (
              <>
                <div className="font-medium leading-6 text-lg text-gray-900 pb-2">回答：</div>
                <p className="mt-2 text-gray-700">{output}</p>
              </>
            )}

        
      </div>
    </div>
  );
}
