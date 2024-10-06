import { chatInputState } from '@/app/state/chatInputState';
import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaShare } from 'react-icons/fa';
import { FaHandPointLeft } from 'react-icons/fa6';
import { useRecoilState } from 'recoil';

type MenuItem = {
  id: number;
  icon: JSX.Element;
  bgColor: string;
  action: (word : string) => void;
  menuName: string;
  prompt: string;
};

const FloatingActionMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chatInput, setChatInput] = useRecoilState(chatInputState)

  const toggleMenu = () => {
    setIsOpen(!isOpen); // メニューの表示/非表示をトグルする
  };

  const handleMenuClick = (word : string) => setChatInput({content: word});

  // メニューアイテムの配列
  const menuItems: MenuItem[] = [
    { id: 1, icon: <FaHandPointLeft />, bgColor: 'bg-gray-800  hover:bg-gray-700',    action: (word : string) => handleMenuClick(word) , menuName:'関連するキーワードを探す　' , prompt : "次のワードに関連するSEOキーワードを10個特定してください。"},
    { id: 2, icon: <FaHandPointLeft />, bgColor: 'bg-red-500   hover:bg-red-400',     action: (word : string) => handleMenuClick(word) , menuName:'キーワードの「検索意図」を表にする　', prompt : "次のワードの検索意図（Buyクエリ、Knowクエリ、Doクエリ、Goクエリ）を表に分類してください。"},
    { id: 3, icon: <FaHandPointLeft />, bgColor: 'bg-green-500 hover:bg-green-400',   action: (word : string) => handleMenuClick(word) , menuName:'キーワード戦略を調査する　' , prompt : "次のワードの上位5つのSEOキーワード戦略を調査してください。"},
    { id: 4, icon: <FaHandPointLeft />, bgColor: 'bg-blue-600 hover:bg-blue-500',     action: (word : string) => handleMenuClick(word) , menuName:'検索ボリュームと難易度を指定する　' , prompt : "あなたが SEOリーダーであると仮定します。次のワードについて、検索ボリュームが多く、難易度は低いキーワードをいくつか提案してください。"},
    { id: 5, icon: <FaHandPointLeft />, bgColor: 'bg-yellow-700 hover:bg-yellow-600', action: (word : string) => handleMenuClick(word) , menuName:'ロングテールキーワードを提案させる　' , prompt : "あなたがコンテンツマーケターと仮定します。次のワードに関連するロングテールで高ボリューム、低難度のキーワードを提供してください。"},
    { id: 6, icon: <FaHandPointLeft />, bgColor: 'bg-slate-800 hover:bg-slate-700',   action: (word : string) => handleMenuClick(word) , menuName:'キーワードからトピックをリスト化させる　' , prompt : "あなたがオンラインマーケティングマネージャーと仮定します。次のワードに関連する広範なトピックのリストを作成し、各トピックを顧客が使用すると思われるフレーズのリストで展開してください。"},
  ];

  return (
    <div className="fixed bottom-28  right-7 ">
      {/* フローティングアクションボタン */}
      <button
        onClick={toggleMenu}
        className="
          w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg
          flex items-center justify-center transition-transform transform hover:scale-110
          focus:outline-none 
        "
      >
        <FaPlus
          className={`text-xl transform transition-transform duration-300 ${
            isOpen ? 'rotate-45' : ''
          }`}
        />
      </button>

      {/* メニューリストを map で表示 */}
      {isOpen && (
        <div className="relative">
          <ul className="absolute bottom-20 right-0 w-max  bg-gray-100 p-5">
            {menuItems.map((item) => (
              <li key={item.id} className='flex gap-1 mb-2'>
                <button
                  onClick={() => item.action(item.prompt)}
                  className={`
                    w-12 h-12 ${item.bgColor} text-white rounded-full
                    flex items-center justify-center shadow-lg focus:outline-none
                    
                  `}
                >
                  {item.icon}
                </button>
                <div className='my-auto pl-3 rounded'>{item.id} . {item.menuName}</div>
              </li>
            ))}
            <div className="absolute bottom-[-16px] right-0 transform -translate-x-1/2 w-0 h-0 
                            border-t-[16px] border-t-gray-100 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent "></div>
          </ul>
          
        </div>
      )}
    </div>
  );
};

export default FloatingActionMenu;
