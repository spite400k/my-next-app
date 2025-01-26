'use client'

import React from 'react';
import { useSession } from 'next-auth/react';

const Header = () => {
    const { data: session } = useSession();
    const username = (session != null ? session.user?.name : 'ゲスト');


    return (
        <header className="flex justify-between items-center p-3 bg-gray-800 text-white">
            <h1 className="text-lg text-left">ブログ作成支援</h1>
            <h2 className='text-right'>ようこそ、{username}さん！</h2>
        </header>
    )
};

export default Header;