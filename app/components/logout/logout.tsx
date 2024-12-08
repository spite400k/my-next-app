'use client';

import { signOut } from "next-auth/react";

export default function LogoutPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="bg-red-500 text-white py-2 px-4 rounded"
      >
        Log Out
      </button>
    </div>
  );
}
