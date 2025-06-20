'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import LoadingSpinner from '../common/LoadingSpinner';
import { supabase } from '@/lib/supabase';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signInWithEmail = async (email: string, password: string) => {
    setError('');
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
        setLoading(false);
        return false;
      }
      if (data.user) {
        setLoading(false);
        return true;
      }
      setError('ログインに失敗しました。');
      setLoading(false);
      return false;
    } catch (e) {
      setError('予期せぬエラーが発生しました。');
      setLoading(false);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await signInWithEmail(email, password);
    if (success) {
      router.push("/");
    } else {
      setError('ログインに失敗しました。');
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <LoadingSpinner />}

      <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-8 overflow-auto">
        <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
                
          {/* 左側の説明＋画像 */}
          <div className="w-full md:w-1/2 bg-blue-500 p-8 flex flex-col justify-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              ブログ作成の新しいスタートを、AIと一緒に。
            </h2>
            <p className="text-lg">
              ブログを書く時間がない、アイデアが浮かばない、そんな悩みを解決します。<br /><br />
            </p>
            <img
              src="/login.webp"
              alt="login"
              className="w-full max-w-xs sm:max-w-sm md:max-w-full h-auto mt-4 md:mt-0"
            />

          </div>

          {/* 右側のログインフォーム */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Log In</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2">メールアドレス</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="メールアドレス"
                  required
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
                  required
                />
              </div>  
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
                disabled={loading}
              >
                ログイン
              </button>
            </form>

            <div className="text-center py-2">もしくは</div>

            <button
              onClick={() => signIn("google", { callbackUrl: "/login" })}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition disabled:opacity-50"
              disabled={loading}
            >
              Sign in with Google
            </button>

            <div className="text-center pt-10">アカウントをお持ちでないですか？</div>

            <button 
              className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-700 transition mt-2" 
              disabled={loading}
            >
              <a href="/signup">会員登録</a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
