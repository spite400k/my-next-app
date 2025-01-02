"use client";
import { keywordInputState } from '@/app/state/keywordInputState';
import { keywordLogState } from '@/app/state/keywordLogState';
import { loadingState } from '@/app/state/loadingState';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import LoadingSpinner from '../common/LoadingSpinner';
import MultiLineBody from '../chat/MultiLineBody';

const TopicSelection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [customTopic, setCustomTopic] = useState('');
  const [suggestedTopics, setSuggestedTopics] = useState<string[]>([]);

  //  ローディング状態を管理
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  // チャット欄の入力値を管理
  const [keywordInput, setKeywordInput] = useRecoilState(keywordInputState);
  // チャットログを管理
  const [keywordLog, setKeywordLog] = useRecoilState(keywordLogState);

  const categories = ['テクノロジー', 'ライフスタイル', '健康', 'ビジネス', '教育'];
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
  
  const handleCategorySelect = (category: string) => {
    // console.log('categories:', categories);
    // console.log('category:', category);
    
    setSelectedCategory(category);
    setSelectedTopic(null); // Reset topic when category changes


    choiceCategory(category)
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setCustomTopic(''); // Reset custom topic when a predefined topic is selected
  };

  const handleCustomTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTopic(e.target.value);
    setSelectedTopic(null); // Reset predefined topic when custom topic is entered

    choiceCategory(e.target.value)

  };

  const handleNext = () => {
    const finalTopic = customTopic || selectedTopic || selectedCategory;
    if (!finalTopic) {
      alert('トピックを選択または入力してください！');
      return;
    }
    console.log('選択されたトピック:', finalTopic);
    // Navigate to the next step or save the selection
  };



  // チャット送信処理
  const choiceCategory = async (category: string)=>{

    // ローディング中は何もしない
    setIsLoading({ bool: true});

    // チャットログにユーザーのメッセージを追加
    // 送信対象のメッセージのIDを生成
    const newId = keywordLog.length > 0 ? keywordLog[keywordLog.length - 1].id + 1 : 1;

    // 送信対象のメッセージを生成
    const newUserMessage = {
      id: newId,
      content: category || '',
      sender: 'user',
      time: new Date().toLocaleTimeString(), // クライアントサイドでのみ処理
    };

    // 既存のチャットログに追加
    const updatedMessages = [newUserMessage];
    // setKeywordLog(updatedMessages);
 
    // チャット入力欄をリセット
    // setkeywordInput({content: ""});


    // GPT-3にリクエストを送信
    try {
      const res = await fetch(`/api/responseCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ prompt: category, chatLog:updatedMessages }),
      });
      
      if (!res.ok) {
        throw new Error('Response error');
      }

      // GPT-3からのレスポンスを取得
      const result = await res.json();
      // GPT-3からのレスポンスをチャットログに追加
      // const newGptMessage = {
      //   id: newId + 1,
      //   content: result.gptResponseMessage,
      //   sender: 'other',
      //   time: new Date().toLocaleTimeString(),
      // };
      // // setKeywordLog((prevLog) => [...prevLog, newGptMessage]);
      // setKeywordLog([newGptMessage]);
      // suggestedTopics.push(result.gptResponseMessage)
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

      <div className="grid grid-cols-2 gap-6">
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

          <h2 className="text-xl font-semibold mt-6 mb-4">トピックから選ぶ</h2>
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

        {/* Custom Input and Search */}
        <div>
          <h2 className="text-xl font-semibold mb-4">トピックを自由に入力</h2>
          <input
            type="text"
            value={customTopic}
            onChange={handleCustomTopicChange}
            placeholder="例: 自宅でできる簡単エクササイズ"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          次へ
        </button>
      </div>

      <div className="mt-8">
        {keywordInput.content}
        {selectedCategory}
        {selectedTopic}
      </div>
      <div className="mt-8">
        {keywordLog.map((message) => (
          // <div key={message.id} className="mb-2">
          //   <span className="font-semibold">{message.sender === 'user' ? 'ユーザー' : 'AI'}</span>
          //   <span className="text-gray-600 text-sm ml-2">{message.time}</span>
          //   <p className="mt-1">{message.content}</p>
          // </div>
        
          <div className={`text-sm markdown  ${
            message.sender === 'user' ? 'whitespace-pre-wrap' : '' }`}>
          <MultiLineBody body={message.content} />
          </div>
        
        ))}
      </div>

    </div>
  );
};

export default TopicSelection;
