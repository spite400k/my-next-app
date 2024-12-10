'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
// import bcrypt from "bcrypt";
// const bcrypt = require("bcrypt");
import LoadingSpinner from '../common/LoadingSpinner';

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  //  ローディング状態を管理
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true)
    try {
    //   const hashedPassword = await bcrypt.hash(password, 10);
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: password, name }),
      });
      if (res.ok) {
        router.push("/login");
        // router.push("/signin");

    } else {
        setError("Failed to create account.");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
    setLoading(false)
  };

  return (
    <>
        {loading && <LoadingSpinner />}
        <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
            <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
            <form onSubmit={handleSignUp}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2">Name</label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2">Email</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2">Password</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
                />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
                Sign Up
            </button>
            </form>
        </div>
        </div>
    </>
  );
}
