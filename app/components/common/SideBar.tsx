'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const Sidebar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();
  }, []);

  if (!isAuthenticated) return null; // 未ログインなら非表示

  return (
    <nav className="w-64 bg-blue-500 text-white p-4">
      <ul>
        <li className="mb-2">
          <a href="/choiceKeyword" className="block py-2 px-4 rounded hover:bg-gray-700">キーワード選定</a>
        </li>
        <li className="mb-2">
          <a href="/chat" className="block py-2 px-4 rounded hover:bg-gray-700">チャットで記事作成</a>
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
