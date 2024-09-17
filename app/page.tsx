"use client";

import React, { FormEvent, useRef, useState } from "react";
import { BeakerIcon } from '@heroicons/react/24/solid'
import ReactMarkdown from "react-markdown";

// メッセージ
interface Message {
  role: string;
  content: string;
}

const MultiLineBody = ({ body }: { body: string }) => {
  const texts = body.split('\\\\n').map((item, index) => {
    // console.log("3:"+item);
    // item = item.replace(/\n\n/g, '  ');
    // console.log("4:"+item);
    return (
      <React.Fragment key={index}>
        <ReactMarkdown>{item}</ReactMarkdown>
        {/* <br /> */}
      </React.Fragment>
    );
  });
  return <div>{texts}</div>;
};
const output2: any= `
# 見出し1
## 見出し2
- リスト項目1
- リスト項目2

こんにちは！
私はAssistant、OpenAIによって開発されたAIです。以下は私の自己紹介です：

---

## 基本情報

- **名前**: Assistant
- **開発者**: OpenAI
- **役割**: 自然言語生成AI

---

## 機能

1. **質問応答**
  - 幅広いトピックに対応可能
  - 知識のアップデートは定期的に行われる

2. **文章生成**
  - ブログ記事、エッセイ、技術文書などの執筆
  - 創作やストーリーテリングのサポート

3. **翻訳**
  - 多言語対応
  - 正確な翻訳

---

## 趣味

- **読書**: 様々なジャンルの書籍を読む
- **プログラミング**: 新しいアルゴリズムやツールの研究
- **コミュニケーション**: ユーザーとの対話を楽しむ

---

## 連絡方法

- 特定の連絡先はありませんが、いつでもここで質問をしていただければお答えします！

---

私の自己紹介は以上です。何か質問があれば、お気軽にどうぞ！
`;


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
          // buffer = buffer.replace(/\\n\\n/g, '  ');
          console.log("22222:"+buffer);
          // process.stdout.write(buffer);
          setOutput(buffer);
          boundary = chunk.indexOf("\n");
        }
      }

      // console.log(output);
      // process.stdout.write(output);
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
      // console.log(output);
      // process.stdout.write(output);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mx-auto my-16 min-w-1/2 max-w-2xl px-4">
      {/* <div className="bg-gray-700 rounded-md md:flex md:items-center md:justify-between py-4 px-4">
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
      </div> */}


      

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
              <div className="markdown whitespace-pre-line" >
                  <div className="font-medium leading-6 text-lg text-gray-900 pb-2">回答：</div>
                  {/* <p className="mt-2 text-gray-700">{output}</p> */}
                  <MultiLineBody body={output} />
                  {/* <ReactMarkdown >{output}</ReactMarkdown> */}
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
              {/* <button type="button" onClick={() => fileInputRef.current.click()} className="ml-2">
                <BeakerIcon className="h-6 w-6 text-gray-500" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={sendFile}
              /> */}
              <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg" type="submit">
                送信
              </button>
            </form>

            <ReactMarkdown className='markdown'>{output2}</ReactMarkdown>
          </div>
        </div>
      
    </div>
  );
}
