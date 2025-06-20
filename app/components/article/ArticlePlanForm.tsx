'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

type ArticlePlanFormProps = {
  onSave: (data: { keyword: string; structure: any; audience?: string }) => Promise<void>;
  isSaving: boolean;
};

const ArticlePlanForm = ({ onSave, isSaving }: ArticlePlanFormProps) => {
  const [keyword, setKeyword] = useState('');
  const [audience, setAudience] = useState('');
  const [title, setTitle] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [headings, setHeadings] = useState<string[]>(['']);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSave = async () => {
    setError('');

    // セッション確認
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.user) {
      setError('ログインが必要です。');
      return;
    }

    const structure = {
      title,
      introduction,
      headings,
    };

    const { error: insertError } = await supabase.from('trn_article_plans').insert({
      user_id: session.user.id,
      keyword,
      audience,
      structure,
    });

    if (insertError) {
      setError('保存に失敗しました: ' + insertError.message);
    } else {
      alert('記事構成を保存しました！');
      router.push('/'); // 保存後に遷移させたい先
    }
  };

  const updateHeading = (index: number, value: string) => {
    const updated = [...headings];
    updated[index] = value;
    setHeadings(updated);
  };

  const addHeading = () => setHeadings([...headings, '']);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">記事構成を保存</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <label className="block mb-2">
        キーワード
        <input
          className="w-full border p-2 rounded"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </label>

      <label className="block mb-2">
        想定読者
        <input
          className="w-full border p-2 rounded"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
        />
      </label>

      <label className="block mb-2">
        タイトル
        <input
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label className="block mb-2">
        導入文
        <textarea
          className="w-full border p-2 rounded"
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
        />
      </label>

      <div className="mb-2">
        <div className="font-semibold">見出し</div>
        {headings.map((h, i) => (
          <input
            key={i}
            className="w-full border p-2 my-1 rounded"
            placeholder={`見出し${i + 1}`}
            value={h}
            onChange={(e) => updateHeading(i, e.target.value)}
          />
        ))}
        <button onClick={addHeading} className="text-blue-600 text-sm mt-1 underline">
          ＋見出しを追加
        </button>
      </div>

      <button
        onClick={handleSave}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        保存する
      </button>
    </div>
  );
};

export default ArticlePlanForm;
