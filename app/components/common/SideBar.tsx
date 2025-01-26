'use client'

import React from 'react';
import { useSession } from 'next-auth/react';

const Sidebar = () => {
  const { data: session } = useSession();

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
            <a href="#services" className="block py-2 px-4 rounded hover:bg-gray-700">Services</a>
          </li>
          <li className="mb-2">
            <a href="/dashboard" className="block py-2 px-4 rounded h over:bg-gray-700">ダッシュボード</a>
          </li>
          <li className="mb-2">
            {(session == null) &&   <a href="/login" className="block py-2 px-4 rounded hover:bg-gray-700">ログイン</a>}
          </li>
          <li className="mb-2">
            {(session == null) &&   <a href="/signup" className="block py-2 px-4 rounded hover:bg-gray-700">会員登録</a>}
          </li>
          
          <li className="mb-2">
            {(session != null) &&   <a href="/logout" className="block py-2 px-4 rounded hover:bg-gray-700">ログアウト</a>}
          </li>
        </ul>
      </nav>
    );
  };
  
  export default Sidebar;