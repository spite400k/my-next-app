'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        const json = await res.json();
        setError(json.message || "登録に失敗しました。");
      }
    } catch (err) {
      setError("通信エラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        
        {/* 左側の説明や画像など */}
        <div className="w-full md:w-1/2 bg-blue-500 text-white p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">
            新しいブログ作成を始めよう、AIとともに。
          </h2>
          <p className="mb-6">
            ブログを書く時間がない、アイデアに悩むあなたをサポートします。
          </p>
          <img
            src="/signup.webp"
            alt="signup illustration"
            className="max-w-full h-auto rounded-lg"
          />
        </div>

        {/* 右側のフォーム */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">会員登録</h2>
          {error && (
            <p className="mb-4 text-sm text-red-600 border border-red-600 rounded px-3 py-2">
              {error}
            </p>
          )}
          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="name">
                お名前
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="山田 太郎"
                required
                autoComplete="name"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="example@example.com"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="password">
                パスワード
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="******"
                required
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "登録中..." : "会員登録"}
            </button>
          </form>
          <p className="text-center mt-6 text-gray-600">
            すでにアカウントをお持ちですか？{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              ログイン
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
