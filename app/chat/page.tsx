"use client";

import React from "react";
import ChatClient from "../components/chat/ChatClient";

// ホーム
export default function Page() {

  return (
    <div className="flex flex-col  h-screen overflow-hidden">
      {/* <!-- チャットヘッダー --> */}
      <div className="flex flex-grow overflow-y-auto">
        <div className="flex-grow flex flex-col bg-gray-100">
          <ChatClient />
        </div>
      </div>
    </div>
  );
}
