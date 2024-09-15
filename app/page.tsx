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
    } catch (error) {
      console.log("Error:", error);
    }
  }

  // 送信ボタン押下時に呼ばれる
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      fetchStream([{ role: "user", content: input }]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <div>{output}</div>
    </div>
  );
}
