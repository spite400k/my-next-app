'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ArticlePlanForm from '@/app/components/article/ArticlePlanForm';

export default function NewArticlePlanPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // フォームから送られてきた記事構成データを受けてSupabaseに保存
  const handleSave = async (data: {
    keyword: string;
    structure: any;
    audience?: string;
  }) => {
    setSaving(true);
    setError(null);

    try {
      const res = await fetch('/api/article-plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || '保存に失敗しました');
      }

      // 保存成功したら記事構成一覧や詳細ページへ遷移
      router.push('/article-plan');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">新しい記事構成を作成</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <ArticlePlanForm onSave={handleSave} isSaving={saving} />
    </div>
  );
}
