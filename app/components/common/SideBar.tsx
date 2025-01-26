'use client'

import React from 'react';
import { useSession } from 'next-auth/react';

const Sidebar = () => {
  const { data: session } = useSession();

    return (
      <nav className="w-64 bg-blue-500 text-white p-4">
        <ul>

          <li className="mb-2">
            <a href="/choiceKeyword" className="block py-2 px-4 rounded hover:bg-gray-700">キーワード選定</a>
          </li>
          <li className="mb-2">
            <a href="/chat" className="block py-2 px-4 rounded h over:bg-gray-700">チャットで記事作成</a>
          </li>
          <li className="mb-2">
            <a href="/" className="block py-2 px-4 rounded hover:bg-gray-700">Home</a>
          </li>
          <li className="mb-2">
            <a href="#about" className="block py-2 px-4 rounded hover:bg-gray-700">About</a>
          </li>
        </ul>
      </nav>
    );
  };
  
  export default Sidebar;