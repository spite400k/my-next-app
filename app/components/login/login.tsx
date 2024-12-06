import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { useRouter } from 'next/navigation';
import { userState } from '@/app/state/userAtom';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 仮の認証ロジック
    if (email === 'user@example.com' && password === 'password123') {
      setUser({ email, name: 'Sample User' }); // ユーザー情報をRecoilに保存
      router.push('/chat'); // ログイン成功でダッシュボードへ
    } else {
      setError('メールアドレスまたはパスワードが正しくありません。');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">ログイン</h1>
        <form onSubmit={handleLogin}>
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
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}
