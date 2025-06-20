'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Dashboard() {
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!session || error) {
        router.push('/');
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/');
        return;
      }
      
      setUserName(user.user_metadata?.name ?? user.email ?? 'ゲスト');
      setLoading(false);
    };

    getUser();
  }, [router]);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white p-6 sm:p-8 rounded shadow-md text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">ダッシュボード</h1>
        <p className="text-gray-700 text-base sm:text-lg">ようこそ、{userName}さん！</p>
      </div>
    </div>
  );
}
