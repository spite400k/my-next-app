"use client";

import React from "react";
import Header from "../components/common/Header";
import Sidebar from "../components/common/SideBar";
import ChatClient from "../components/chat/ChatClient";

// ホーム
export default function Page() {

  return (
    <div className="flex flex-col  min-h-screen">
      {/* <!-- チャットヘッダー --> */}
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        <ChatClient />
      </div>
    </div>
  );
}
