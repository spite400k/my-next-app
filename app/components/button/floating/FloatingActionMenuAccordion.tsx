import React, { useState } from 'react';
import { FaEdit, FaTrash, FaShare, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface MenuItem {
  id: number;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  subItems?: SubMenuItem[];
}

interface SubMenuItem {
  id: number;
  label: string;
  onClick: () => void;
}

const FloatingActionMenuAccordion: React.FC = () => {
  // メニュー項目のリスト
  const menuItems: MenuItem[] = [
    {
      id: 1,
      label: '編集',
      icon: <FaEdit />,
      onClick: () => handleMenuClick(1),
            subItems: [
        { id: 4.1, label: 'サブメニュー1', onClick: () => handleSubMenuClick(4.1) },
        { id: 4.2, label: 'サブメニュー2', onClick: () => handleSubMenuClick(4.2) },
      ],
    },
    {
      id: 2,
      label: '削除',
      icon: <FaTrash />,
      onClick: () => handleMenuClick(2),
            subItems: [
        { id: 4.1, label: 'サブメニュー1', onClick: () => handleSubMenuClick(4.1) },
        { id: 4.2, label: 'サブメニュー2', onClick: () => handleSubMenuClick(4.2) },
      ],
    },
    {
      id: 3,
      label: '共有',
      icon: <FaShare />,
      onClick: () => handleMenuClick(3),
            subItems: [
        { id: 4.1, label: 'サブメニュー1', onClick: () => handleSubMenuClick(4.1) },
        { id: 4.2, label: 'サブメニュー2', onClick: () => handleSubMenuClick(4.2) },
      ],
    },
    {
      id: 4,
      label: 'その他', // アコーディオンメニュー
      icon: <FaChevronDown />, // アコーディオンを示すアイコン
      subItems: [
        { id: 4.1, label: 'サブメニュー1', onClick: () => handleSubMenuClick(4.1) },
        { id: 4.2, label: 'サブメニュー2', onClick: () => handleSubMenuClick(4.2) },
      ],
    },
  ];

  // アコーディオンの開閉状態を管理する
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // メインメニューがクリックされたときに実行される関数
  const handleMenuClick = (id: number) => {
    console.log(`メニュー項目 ${id} がクリックされました`);
  };

  // サブメニューがクリックされたときに実行される関数
  const handleSubMenuClick = (id: number) => {
    console.log(`サブメニュー項目 ${id} がクリックされました`);
  };

  // アコーディオンの開閉を切り替える関数
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div className="fixed bottom-28  right-7">
      <ul className="space-y-2">
        {/* メインメニューを描画 */}
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={item.subItems ? toggleAccordion : item.onClick} // アコーディオンか通常のクリック
              className="
                w-16 h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-full
                flex items-center justify-center shadow-lg focus:outline-none
              "
            >
              {isAccordionOpen && item.subItems ? <FaChevronUp /> : item.icon} {/* アコーディオンのアイコン切り替え */}
            </button>

            {/* アコーディオンメニューの表示 */}
            {item.subItems && isAccordionOpen && (
              <ul className="ml-14 mt-2 space-y-1">
                {item.subItems.map((subItem) => (
                  <div className="absolute bottom-1  right-20">
                    <li key={subItem.id}>
                      <button
                        onClick={subItem.onClick}
                        className="
                        w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-full
                          flex items-center justify-center shadow-md focus:outline-none
                        "
                      >
                        {subItem.label}
                      </button>
                    </li>
                  </div>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FloatingActionMenuAccordion;
