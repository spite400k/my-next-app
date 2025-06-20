'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';  // クライアント用Supabase

export default function LogoutPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');  // ログインページにリダイレクト
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded"
      >
        Log Out
      </button>
    </div>
  );
}
