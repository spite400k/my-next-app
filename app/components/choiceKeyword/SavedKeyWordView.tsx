"use client";
import { loadingState } from '@/app/state/loadingState';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

const SavedKeyWordView = () => {
  const categories = ['テクノロジー', 'ライフスタイル', '健康', 'ビジネス', '教育'];
  const sexes = ['男性', '女性', 'その他'];
  const ages = ['10代', '20代', '30代','40代', '50代', '60代','70代', '80代', '90代'];

  //  ローディング状態を管理
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const [keyword, setKeyword] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const response = await fetch('/api/keyword');
        if (!response.ok) {
          throw new Error('Failed to fetch keywords');
        }
        const data = await response.json();
        console.log(data);
        setKeyword(data);
      } catch (error) {
        // setError(error.message);
      } finally {
        setIsLoading({ bool: false });
      }
    };

    fetchKeywords();
  }, []);

  return (
    <div className="p-8 w-half mx-auto">
      {isLoading.bool && <LoadingSpinner />}
      
      <h1 className="text-2xl font-bold">保存したキーワード</h1>
      <div className="mt-4">
        <h2 className="text-lg font-bold">カテゴリ</h2>
        <div className="flex flex-wrap">
          {keyword.map((item) => (
            <div key={item.id} className="bg-gray-200 p-2 m-1 rounded-lg">
              {item.selectedCategory}
              {item.customTopic}
              {item.selectedSex}
              {item.selectedAge}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedKeyWordView;


