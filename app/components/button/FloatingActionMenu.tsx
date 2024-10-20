import { chatInputState } from '@/app/state/chatInputState';
import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaShare } from 'react-icons/fa';
import { FaChevronUp, FaHandPointLeft } from 'react-icons/fa6';
import { useRecoilState } from 'recoil';

type MenuItem = {
  subItems: SubMenuItem[];
  id: number;
  icon: JSX.Element;
  bgColor: string;
  action: (word : string) => void;
  menuName: string;
};
type SubMenuItem = {
  id: number;
  action: (word : string) => void;
  menuName: string;
  prompt: string;
};

const FloatingActionMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chatInput, setChatInput] = useRecoilState(chatInputState)
  // アコーディオンの開閉状態を管理する
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen); // メニューの表示/非表示をトグルする
  };
    // アコーディオンの開閉を切り替える関数
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleMenuOpen = (word: string) => setChatInput({ content: word });
  const handleMenuClick = () => toggleAccordion();
    // サブメニューがクリックされたときに実行される関数
  const handleSubMenuClick = (word: string) => setChatInput({ content: word });


  // サブメニューアイテムの配列
  const subMenuItems: SubMenuItem[] = [
    { id: 4.1, action: (word : string) => handleSubMenuClick(word) ,  menuName:'関連するキーワードを探す　' , prompt : "次のワードに関連するSEOキーワードを10個特定してください。"},
    { id: 4.2, action: (word : string) => handleSubMenuClick(word) ,  menuName:'キーワードの「検索意図」を表にする　' , prompt : "次のワードの検索意図（Buyクエリ、Knowクエリ、Doクエリ、Goクエリ）を表に分類してください。"},
    { id: 4.3, action: (word : string) => handleSubMenuClick(word) ,  menuName:'キーワード戦略を調査する　' , prompt : "次のワードの上位5つのSEOキーワード戦略を調査してください。"},
    { id: 4.4, action: (word : string) => handleSubMenuClick(word) ,  menuName:'検索ボリュームと難易度を指定する　' , prompt : "あなたが SEOリーダーであると仮定します。次のワードについて、検索ボリュームが多く、難易度は低いキーワードをいくつか提案してください。"},
    { id: 4.5, action: (word : string) => handleSubMenuClick(word) ,  menuName:'ロングテールキーワードを提案させる　' , prompt : "あなたがコンテンツマーケターと仮定します。次のワードに関連するロングテールで高ボリューム、低難度のキーワードを提供してください。"},
    { id: 4.6, action: (word : string) => handleSubMenuClick(word) ,  menuName:'キーワードからトピックをリスト化させる　' , prompt : "あなたがオンラインマーケティングマネージャーと仮定します。次のワードに関連する広範なトピックのリストを作成し、各トピックを顧客が使用すると思われるフレーズのリストで展開してください。"},
  ];
  // メニューアイテムの配列
  const menuItems: MenuItem[] = [
    {
      id: 1, icon: <FaHandPointLeft />, bgColor: 'bg-gray-800  hover:bg-gray-700',
      action: (word: string) => handleMenuOpen(word),
      menuName: 'SEOキーワード抽出　',
      subItems: []
    },
    {
      id: 2, icon: <FaHandPointLeft />, bgColor: 'bg-red-500   hover:bg-red-400',
      action: (word: string) => handleMenuOpen(word),
      menuName: 'SEOに強いタイトルを作る　',
      subItems: []
    },
    {
      id: 3, icon: <FaHandPointLeft />, bgColor: 'bg-green-500 hover:bg-green-400',
      action: (word: string) => handleMenuOpen(word),
      menuName: '記事のアウトラインを生成　',
      subItems: []
    },
    {
      id: 4, icon: <FaHandPointLeft />, bgColor: 'bg-blue-600 hover:bg-blue-500',
      action: (word: string) => handleMenuOpen(word),
      menuName: 'SEOに強い記事本文の作成　',
      subItems: []
    },
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
                  onClick={() => item.action(item.menuName)}
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
            
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={toggleAccordion} // アコーディオンか通常のクリック
              className="
                w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg
          flex items-center justify-center transition-transform transform hover:scale-110
          focus:outline-none 
              "
            >
              {isAccordionOpen && item.subItems ? <FaChevronUp /> : item.icon} {/* アコーディオンのアイコン切り替え */}
            </button>

            {/* アコーディオンメニューの表示 */}
            {item.subItems && isAccordionOpen && (
              <ul className="ml-14 mt-2 space-y-1">
                {item.subItems.map((subItem:SubMenuItem) => (
                  <li key={subItem.id}>
                    <button
                      onClick={()=> subItem.action(subItem.prompt)}
                      className="
                        w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-full
                        flex items-center justify-center shadow-md focus:outline-none
                      "
                    >
                      {subItem.menuName}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}

          </ul>
          
        </div>
      )}
    </div>
  );
};

export default FloatingActionMenu;
