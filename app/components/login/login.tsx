'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import LoadingSpinner from '../common/LoadingSpinner';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  //  ローディング状態を管理
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password, 
    });

    if (!result?.ok) {
      setError('ログインに失敗しました。');
      
    }else{
      router.push("/");
    }
    // ローディングを終了する
    setLoading(false)
  };

  return (
    <>
      {loading && <LoadingSpinner />}

      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
          <h1 className="text-2xl font-bold text-center mb-4">ログイン</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">メールアドレス</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="メールアドレス"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">パスワード</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="パスワード"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              disabled={loading}
            >
              ログイン
            </button>

          </form>
          <div className="text-center py-2 ">OR</div>
          <button
              onClick={() => signIn("google", { callbackUrl: "/login" })}
              className="w-full bg-red-500 text-white py-2 rounded"
              disabled={loading}
            >
              Sign in with Google
            </button>
        </div>

      </div>
    </>
  );
}
