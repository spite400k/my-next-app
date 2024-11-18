"use client";

import React from "react";
import ChatClient from "./components/ChatClient";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";

// ホーム
export default function Home() {

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
