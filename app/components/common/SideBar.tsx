'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setUserName(session?.user.user_metadata?.name ?? 'ゲスト');
    };
    fetchUser();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setUserName(session?.user.user_metadata?.name ?? 'ゲスト');
    });

    return () => {
      subscription.subscription?.unsubscribe?.();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!isAuthenticated) return null;

  const SidebarContent = () => (
    <>
      <div className="mb-4 text-sm text-white">
        ようこそ、<span className="font-bold">{userName}</span>さん！
      </div>

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
          <Link href="/article-plan" className="block py-2 px-4 rounded hover:bg-gray-700">
            記事構成一覧
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

      <button
        onClick={handleLogout}
        className="mt-6 bg-white text-blue-500 w-full py-2 rounded hover:bg-gray-200"
      >
        ログアウト
      </button>
    </>
  );

  return (
    <>
      {/* ハンバーガー（モバイル） */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white bg-blue-600 p-2 rounded shadow"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* デスクトップ用サイドバー */}
      <nav className="fixed top-0 left-0 h-full w-64 bg-blue-500 text-white p-4 hidden md:block z-50">
        <SidebarContent />
      </nav>


      {/* モバイル用サイドメニュー */}
      {isOpen && (
        <div className="md:hidden fixed top-0 right-0 w-64 h-full bg-blue-500 text-white p-4 z-40 shadow-lg">
          <SidebarContent />
        </div>
      )}
    </>
  );
};

export default Sidebar;
