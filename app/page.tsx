"use client";

import React from "react";

// ホーム
export default function Home() {

  return (
    <div className="flex flex-col  min-h-screen">
      {/* <!-- チャットヘッダー --> */}
      <div className="flex flex-grow">
        <div className="flex-grow flex flex-col bg-gray-100">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
            <h1 className="text-4xl font-bold text-gray-800">ようこそ!</h1>
            <p className="mt-4 text-gray-600">
              AIで簡単ブログ記事作成ページへようこそ！<br />
              あなたのブログをAIがサポートします。<br />
              まずは、キーワード選定から行ってください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
