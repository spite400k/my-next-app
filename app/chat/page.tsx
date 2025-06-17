"use client";

import React from "react";
import Header from "../components/common/Header";
import Sidebar from "../components/common/SideBar";
import ChatClient from "../components/chat/ChatClient";

// ホーム
export default function Page() {

  return (
    <div className="flex flex-col  h-screen overflow-hidden">
      {/* <!-- チャットヘッダー --> */}
      <Header />
      <div className="flex flex-grow overflow-y-auto">
        <Sidebar />
        <div className="flex-grow flex flex-col bg-gray-100">
          <ChatClient />
        </div>
      </div>
    </div>
  );
}
