import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || password.length < 6) {
      return NextResponse.json(
        { message: "有効なメールアドレスと6文字以上のパスワードを入力してください。" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name, // ユーザープロファイルに保存（Supabaseのmetadata）
        },
      },
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 422 });
    }

    return NextResponse.json({ user: data.user });
  } catch (e) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
