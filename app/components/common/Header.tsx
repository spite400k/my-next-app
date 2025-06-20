'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { userState } from '@/app/state/userState';
import { supabase } from '@/lib/supabase';

const Header = () => {
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Supabaseのセッション確認
  useEffect(() => {
    const getUserData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setIsAuthenticated(false);
        if (!['/login', '/signup', '/logout'].includes(pathname)) {
          router.replace('/login');
        }
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);
      setUser({
        name: session.user.user_metadata?.name ?? 'ゲスト',
        email: session.user.email ?? '',
      });
      setLoading(false);
    };

    getUserData();
  }, [pathname, router, setUser]);

  if (loading) return null;

  return (
    <header className="flex justify-between items-center p-3 bg-blue-500 text-white">
      <Head>
        <title>ブログ作成</title>
        <meta name="description" content="AIで簡単ブログ記事作成ページ" />
      </Head>
      <h1 className="text-lg text-left">ブログ作成支援</h1>
      <div className="flex flex-row">
        <h2 className="text-right my-auto">ようこそ、{user?.name || 'ゲスト'}さん！</h2>
        {isAuthenticated ? (
          <button className="mx-2 bg-white rounded text-black w-24">
            <a href="/logout" className="block py-2 px-4 rounded hover:bg-gray-300">ログアウト</a>
          </button>
        ) : (
          <button className="mx-2 bg-white rounded text-black w-24">
            <a href="/login" className="block py-2 px-4 rounded hover:bg-gray-300">ログイン</a>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
