'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { userState } from '@/app/state/userState';

const Header = () => {
    const { data: session, status } = useSession();
    const [user, setUser] = useRecoilState(userState);
    const router = useRouter();
    const pathname = usePathname();

    // ログイン状態を確認してリダイレクト
    useEffect(() => {
        if (status === 'loading') return; // ロード中は何もしない
        if (!session && pathname !== '/login' && pathname !== '/signup' && pathname !== '/logout') {
            router.replace('/login'); // 安全にリダイレクト
        }
    }, [session, status, pathname, router]);

    // ユーザー情報をRecoilに設定
    useEffect(() => {
        if (session) {
            setUser({ name: session.user?.name ?? 'ゲスト', email: session.user?.email ?? '' });
        }
    }, [session, setUser]);

    return (
        <header className="flex justify-between items-center p-3 bg-blue-500 text-white">
            <Head>
                <title>ブログ作成</title>
                <meta name="description" content="AIで簡単ブログ記事作成ページ" />
            </Head>
            <h1 className="text-lg text-left">ブログ作成支援</h1>
            <div className="flex flex-row">
                <h2 className="text-right my-auto">ようこそ、{user?.name || 'ゲスト'}さん！</h2>
                {session == null ? (
                    <button className="mx-2 bg-white rounded text-black w-24">
                        <a href="/login" className="block py-2 px-4 rounded hover:bg-gray-300">
                            ログイン
                        </a>
                    </button>
                ) : (
                    <button className="mx-2 bg-white rounded text-black w-24">
                        <a href="/logout" className="block py-2 px-4 rounded hover:bg-gray-300">
                            ログアウト
                        </a>
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
