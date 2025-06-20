'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

const Sidebar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // return () => {
    //   if (subscription && typeof subscription.unsubscribe === 'function') {
    //     subscription.unsubscribe();
    //   }
    // };
  }, []);


  if (!isAuthenticated) return null;

  return (
    <nav className="w-64 max-w-xs bg-blue-500 text-white p-4">
      <ul>
        <li className="mb-2">
          <Link href="/choiceKeyword" className="block py-2 px-4 rounded hover:bg-gray-700">
            キーワード選定
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/chat" className="block py-2 px-4 rounded hover:bg-gray-700">
            チャットで記事作成
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/" className="block py-2 px-4 rounded hover:bg-gray-700">
            Home
          </Link>
        </li>
        <li className="mb-2">
          <a href="#about" className="block py-2 px-4 rounded hover:bg-gray-700">
            About
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
