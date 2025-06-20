'use client';

import React from 'react';

type HeaderProps = {
  className?: string;
};

const Header = ({ className = "" }: HeaderProps) => {
  return (
    <header
      className={`flex justify-between items-center p-3 bg-blue-500 text-white ${className}`}
      style={{ height: 48 }}
    >
      <h1 className="text-lg text-left">ブログ作成支援</h1>
    </header>
  );
};

export default Header;
