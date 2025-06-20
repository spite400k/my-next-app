
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const { keyword, structure, audience } = body;

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: '未ログインです' }, { status: 401 });
  }

  const { error } = await supabase.from('trn_article_plans').insert({
    user_id: user.id,
    keyword,
    structure,
    audience,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
