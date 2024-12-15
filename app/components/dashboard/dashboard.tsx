"use client";

import { sessionState } from '@/app/state/sessionState';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export default function Dashboard() {
  const { data: session } = useSession();
  const [sessionData, setSessionData] = useRecoilState(sessionState);
  const router = useRouter();

  useEffect(() => {
    if (!session) {

      router.push('/');
    }
  }, [session, router]);

  if (!session) return null;

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">ダッシュボード</h1>
        <p className="text-gray-700">ようこそ、{session.user?.name || 'ゲスト'}さん！</p>
      </div>
    </div>
  );
}
