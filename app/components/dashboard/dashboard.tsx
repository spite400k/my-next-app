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

      console.log('Session:', session);
      console.log('Error:', error);
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

      setUserName(user.user_metadata?.name || user.email || 'ゲスト');
      setLoading(false);
    };

    getUser();
  }, [router]);

  if (loading) return null;

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">ダッシュボード</h1>
        <p className="text-gray-700">ようこそ、{userName}さん！</p>
      </div>
    </div>
  );
}
