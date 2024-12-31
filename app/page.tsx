"use client";

import React from "react";
import ChatClient from "./components/chat/ChatClient";
import Header from "./components/common/Header";
import Sidebar from "./components/common/SideBar";

// ホーム
export default function Home() {

  return (
    <div className="flex flex-col  min-h-screen">
      {/* <!-- チャットヘッダー --> */}
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow flex flex-col bg-gray-100">
          <ChatClient />
        </div>
      </div>
    </div>
  );
}
