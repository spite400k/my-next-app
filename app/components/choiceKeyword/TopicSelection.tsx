"use client";
import { loadingState } from '@/app/state/loadingState';
import { useRecoilState } from 'recoil';
import LoadingSpinner from '../common/LoadingSpinner';
import { useEffect, useState } from 'react';
import { chatInputState } from '@/app/state/chatInputState';
import { useRouter } from 'next/navigation';

const TopicSelection = () => {
  const categories = ['テクノロジー', 'ライフスタイル', '健康', 'ビジネス', '教育'];
  const sexes = ['男性', '女性', 'その他'];
  const ages = ['10代', '20代', '30代','40代', '50代', '60代','70代', '80代', '90代'];

  // カテゴリー
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // 生成キーワード
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  // トピック
  const [customTopic, setCustomTopic] = useState('');
  // 生成されたトピック
  const [suggestedTopics, setSuggestedTopics] = useState<string[]>([]);
  // 年代
  const [selectedAge, setSelectedAge] = useState<string[]>();
  // 性別
  const [selectedSex, setSelectedSex] = useState<string[]>();
  
  const router = useRouter();
  
  // チャット欄の入力値を管理
  const [chatInput, setChatInput] = useRecoilState(chatInputState)

  //  ローディング状態を管理
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  
  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const response = await fetch('/api/keyword');
        if (!response.ok) {
          throw new Error('Failed to fetch keywords');
        }
        const data = await response.json();
        console.log(data);
        // setKeyword(data);
      } catch (error) {
        // setError(error.message);
      } finally {
        setIsLoading({ bool: false });
      }
    };

    fetchKeywords();
  }, []);
  // const suggestedTopics = [
  //   '2025年注目のテクノロジートレンド',
  //   '効果的なリモートワークの方法',
  //   'ダイエット成功の秘訣',
  //   'AIによる未来予測',
  //   '初心者向け投資ガイド',
  // ];

  // useEffect(() => {
  //   if (selectedCategory !== null) {
  //     choiceCategory(selectedCategory);
  //   }
  // }, [selectedCategory]);
  
  // カテゴリー選択時の処理
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedTopic(null); // Reset topic when category changes
    choiceCategory(category)
  };

  // トピック入力時の処理
  const handleCustomTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTopic(e.target.value);
    // setKeywordInput(e.target.value);
  };

  // トピック入力時の処理
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && customTopic.trim() !== "") {
      handleTopicSelect(customTopic.trim());
      // setCustomTopic(""); // 入力後にフィールドをクリア
      choiceCategory(customTopic.trim())
  
    }
  };

  // トピック選択時の処理
  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    // setCustomTopic(''); // Reset custom topic when a predefined topic is selected
  };
  // 年代選択時の処理
  const handleAgeSelect = (age: string) => {
      setSelectedAge((prevAges) => {
        if (prevAges?.includes(age)) {
          return prevAges.filter((a) => a !== age);
        } else {
          return prevAges ? [...prevAges, age] : [age];
        }
      });
    };

  // 性別選択時の処理
  const handleSexSelect = (sex: string) => {
      setSelectedSex((prevSexes) => {
        if (prevSexes?.includes(sex)) {
          return prevSexes.filter((s) => s !== sex);
        } else {
          return prevSexes ? [...prevSexes, sex] : [sex];
        }
      });
    };
  // 次へボタンクリック時の処理
  const savekeyword = async () => {
    const finalTopic = customTopic || selectedTopic || selectedCategory;
    if (!finalTopic) {
      alert('トピックを選択または入力してください！');
      return;
    }

    const response = await fetch('/api/keyword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          selectedCategory: selectedCategory,
          customTopic: customTopic,
          selectedTopic: selectedTopic,
          selectedAge: selectedAge ? selectedAge.join(',') : '',
          selectedSex: selectedSex ? selectedSex.join(',') : '',
      }),
    });

    if (!response.ok) {
      throw new Error('Response error');
    }
  
    const result = await response.json();
    console.log(result);
  };

  // 次へボタンクリック時の処理
  const handleNext = () => {
    const finalTopic = customTopic || selectedTopic || selectedCategory;
    if (!finalTopic) {
      alert('トピックを選択または入力してください！');
      return;
    }
    console.log('選択されたトピック:', finalTopic);

    // チャット欄の入力値を更新
    setChatInput({
      content: 
      "次の内容でブログ記事を書いて  " +
      "カテゴリー: " + selectedCategory + 
      "  トピック: "+ customTopic + 
      "  生成キーワード: "+  selectedTopic  + 
      "  年代: "+  selectedAge + 
      "  性別: "+ selectedSex });
    // console.log('選択されたトピック:', chatInput.content);


    router.push('/chat');

    // Navigate to the next step or save the selection
  };



  // チャット送信処理
  const choiceCategory = async (category: string)=>{

    // ローディング中は何もしない
    setIsLoading({ bool: true});

    // 送信対象のメッセージを生成
    const newUserMessage = {
      id: 1,
      content: category || '',
      sender: 'user',
      time: new Date().toLocaleTimeString(), // クライアントサイドでのみ処理
    };

    // 既存のチャットログに追加
    const updatedMessages = [newUserMessage];
  
    // GPT-3にリクエストを送信
    try {
      const res = await fetch(`/api/responseCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ prompt: category, chatLog:updatedMessages , num:10}),
      });
      
      if (!res.ok) {
        throw new Error('Response error');
      }

      // GPT-3からのレスポンスを取得
      const result = await res.json();
      console.log(result.gptResponseMessage)
      // 正規表現で番号付きリストを抽出
      const regex = /^\d+\.\s*(.+)$/gm;
      const matches = [...result.gptResponseMessage.matchAll(regex)].map(match => match[1]);
      console.log(matches);

      setSuggestedTopics(matches || []); // ここで更新

    } catch (error) {
      console.error('Error fetching GPT response:', error);
    } finally {
      // ローディングを終了する
      setIsLoading({ bool: false });
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">

      {isLoading.bool && <LoadingSpinner />}

      {/* Title and Description */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">トピックを選択してください</h1>
        <p className="text-gray-600">記事にしたいトピックを選ぶか、自由に入力してください。AIが最適な記事を生成します！</p>
      </div>

      <div className="mb-8 grid grid-cols-4 gap-x-4 border border-gray-200">
        <div className="bg-gray-100 px-4 py-2 font-bold">カテゴリー</div>
        <div className="px-4 py-2 col-span-3">{selectedCategory}</div>

        <div className="bg-gray-100 px-4 py-2 font-bold">トピック</div>
        <div className="px-4 py-2 col-span-3">{customTopic}</div>
        
        <div className="bg-gray-100 px-4 py-2 font-bold">生成キーワード</div>
        <div className="px-4 py-2 col-span-3">{selectedTopic}</div>
        
        <div className="bg-gray-100 px-4 py-2 font-bold">年代</div>
        <div className="px-4 py-2 col-span-3">{selectedAge}</div>
        
        <div className="bg-gray-100 px-4 py-2 font-bold">性別</div>
        <div className="px-4 py-2 col-span-3">{selectedSex}</div>
      </div>

      <div className="grid grid-rows-2 gap-6 border p-2">
        {/* Categories and Suggested Topics */}
        <div>
          <h2 className="text-xl font-semibold mb-4">カテゴリーから選択</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`px-4 py-2 border rounded ${
                  selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>


        {/* Custom Input and Search */}
        <div>
          <h2 className="text-xl font-semibold mt-6">トピックを自由に入力</h2>
          <input
            type="text"
            value={customTopic}
            onChange={handleCustomTopicChange}
            onKeyDown={handleKeyDown}
            placeholder="例: 自宅でできる簡単エクササイズ"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

          <h2 className="text-xl font-semibold mt-6 mb-4">生成されたキーワードを選ぶ</h2>
          <div className="overflow-x-auto flex gap-4 flex-wrap max-w-full">
            {suggestedTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicSelect(topic)}
                className={`px-4 py-2 border rounded whitespace-nowrap ${
                  selectedTopic === topic ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

        {/* Target */}
        <div>
          <h2 className="text-xl font-semibold mb-4">年齢を選択</h2>
          <div className="flex flex-wrap gap-2">
            {ages.map((age) => (
              <button
                key={age}
                onClick={() => handleAgeSelect(age)}
                className={`px-4 py-2 border rounded ${
                  selectedAge?.includes(age) ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {age}
              </button>
            ))}
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-4">性別を選択</h2>
          <div className="overflow-x-auto flex gap-4 flex-wrap max-w-full">
            {sexes.map((sex) => (
              <button
                key={sex}
                onClick={() => handleSexSelect(sex)}
                className={`px-4 py-2 border rounded whitespace-nowrap ${
                  selectedSex?.includes(sex) ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {sex}
              </button>
            ))}
          </div>

        </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={savekeyword}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          キーワードを保存する
        </button>
      </div>
      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          AIで作成する
        </button>
      </div>

    </div>
  );
};

export default TopicSelection;
