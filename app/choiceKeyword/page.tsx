"use client";

import React from "react";
import TopicSelection from "../components/choiceKeyword/TopicSelection";

// ホーム
export default function Page() {

  return (
    <div className="flex flex-col  min-h-screen">
      {/* <!-- チャットヘッダー --> */}
      <div className="flex flex-grow">
        <div className="flex-grow flex flex-col bg-gray-100">
          <TopicSelection />
        </div>
      </div>
    </div>
  );
}
