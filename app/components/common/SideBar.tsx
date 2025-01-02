'use client'

import React from 'react';

const Sidebar = () => {
    return (
      <nav className="w-64 bg-gray-800 text-white p-4">
        <ul>
          <li className="mb-2">
            <a href="#home" className="block py-2 px-4 rounded hover:bg-gray-700">Home</a>
          </li>
          <li className="mb-2">
            <a href="#about" className="block py-2 px-4 rounded hover:bg-gray-700">About</a>
          </li>
          <li className="mb-2">
            <a href="/choiceKeyword" className="block py-2 px-4 rounded hover:bg-gray-700">キーワード選定</a>
          </li>
          <li className="mb-2">
            <a href="/chat" className="block py-2 px-4 rounded h over:bg-gray-700">チャットで記事作成</a>
          </li>
          <li className="mb-2">
            <a href="/login" className="block py-2 px-4 rounded hover:bg-gray-700">ログイン</a>
          </li>
          <li className="mb-2">
            <a href="/signup" className="block py-2 px-4 rounded hover:bg-gray-700">会員登録</a>
          </li>
          <li className="mb-2">
            <a href="/logout" className="block py-2 px-4 rounded hover:bg-gray-700">ログアウト</a>
          </li>
        </ul>
      </nav>
    );
  };
  
  export default Sidebar;