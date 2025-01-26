'use client'

import React from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

const Header = () => {
    const { data: session } = useSession();
    const username = (session != null ? session.user?.name : 'ゲスト');


    return (
        <header className="flex justify-between items-center p-3 bg-gray-800 text-white">
            <Head>
                <title>ブログ作成</title>
                <meta name="description" content="AIで簡単ブログ記事作成ページ" />
            </Head>
            <h1 className="text-lg text-left">ブログ作成支援</h1>
            <div className="flex flex-row">
                <h2 className='text-right my-auto'>ようこそ、{username}さん！</h2>
                {(session == null) ? (
                        <>
                            <button className="mx-2 bg-white rounded text-black w-24">
                                <a href="/login" className="block py-2 px-4 rounded hover:bg-gray-300">ログイン</a>
                            </button>
                            <button className="mx-2 bg-white rounded text-black w-24">
                                <a href="/signup" className="block py-2 px-4 rounded hover:bg-gray-300">会員登録</a>
                            </button>
                        </>
                    ): (
                        <button className="mx-2 bg-white rounded text-black w-24">   
                            <a href="/logout" className="block py-2 px-4 rounded hover:bg-gray-300">ログアウト</a>
                        </button>
                    )
                }

                

            </div>
        </header>
    )
};

export default Header;