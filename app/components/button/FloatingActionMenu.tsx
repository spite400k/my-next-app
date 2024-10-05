import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaShare } from 'react-icons/fa';

type MenuItem = {
  id: number;
  icon: JSX.Element;
  bgColor: string;
  action: () => void;
  value: string;
};

const FloatingActionMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // メニューの表示/非表示をトグルする
  };

  const handleEdit = () => alert('編集がクリックされました！');
  const handleDelete = () => alert('削除がクリックされました！');
  const handleShare = () => alert('共有がクリックされました！');

  // メニューアイテムの配列
  const menuItems: MenuItem[] = [
    { id: 1, icon: <FaEdit />, bgColor: 'bg-gray-800 hover:bg-gray-700', action: handleEdit ,value:'関連するキーワードを探す　'},
    { id: 2, icon: <FaTrash />, bgColor: 'bg-red-500 hover:bg-red-400', action: handleDelete ,value:'キーワードの「検索意図」を表にする　'},
    { id: 3, icon: <FaShare />, bgColor: 'bg-green-500 hover:bg-green-400', action: handleShare, value: 'キーワード戦略を調査する　' },
    { id: 4, icon: <FaShare />, bgColor: 'bg-green-600 hover:bg-green-500', action: handleShare, value: '検索ボリュームと難易度を指定する　' },
    { id: 5, icon: <FaShare />, bgColor: 'bg-green-700 hover:bg-green-600', action: handleShare, value: 'ロングテールキーワードを提案させる　' },
    { id: 6, icon: <FaShare />, bgColor: 'bg-green-800 hover:bg-green-700', action: handleShare, value: 'キーワードからトピックをリスト化させる　' },
                
  ];

  return (
    <div className="fixed bottom-24 right-3">
      {/* フローティングアクションボタン */}
      <button
        onClick={toggleMenu}
        className="
          w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg
          flex items-center justify-center transition-transform transform hover:scale-110
          focus:outline-none 
        "
      >
        <FaPlus className="text-xl" />
      </button>

      {/* メニューリストを map で表示 */}
      {isOpen && (
        <div className="relative">
          <ul className="absolute bottom-20 right-0 w-max  bg-gray-100 p-5">
            {menuItems.map((item) => (
              <li key={item.id} className='flex gap-1 mb-2'>
                <button
                  onClick={item.action}
                  className={`
                    w-12 h-12 ${item.bgColor} text-white rounded-full
                    flex items-center justify-center shadow-lg focus:outline-none
                    
                  `}
                >
                  {item.icon}
                </button>
                <div className='my-auto pl-3 rounded'>{item.id} . {item.value}</div>
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
