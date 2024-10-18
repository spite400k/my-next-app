import React, { useState } from 'react';
import { FaEdit, FaTrash, FaShare, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface MenuItem {
  id: number;
  label: string;
  icon: React.ReactNode;
  subItems?: SubMenuItem[];
}

interface SubMenuItem {
  id: number;
  label: string;
  onClick: () => void;
  
}

const FloatingActionMenuAccordion2: React.FC = () => {
  // メニュー項目のリスト
  const menuItems: MenuItem[] = [
    {
      id: 1,
      label: '編集',
      icon: <FaEdit />,
      subItems: [
        { id: 1.1, label: 'サブメニュー1-1', onClick: () => handleSubMenuClick(1.1) },
        { id: 1.2, label: 'サブメニュー1-2', onClick: () => handleSubMenuClick(1.2) },
      ],
    },
    {
      id: 2,
      label: '削除',
      icon: <FaTrash />,
      subItems: [
        { id: 2.1, label: 'サブメニュー2-1', onClick: () => handleSubMenuClick(2.1) },
        { id: 2.2, label: 'サブメニュー2-2', onClick: () => handleSubMenuClick(2.2) },
      ],
    },
    {
      id: 3,
      label: '共有',
      icon: <FaShare />,
      subItems: [
        { id: 3.1, label: 'サブメニュー3-1', onClick: () => handleSubMenuClick(3.1) },
        { id: 3.2, label: 'サブメニュー3-2', onClick: () => handleSubMenuClick(3.2) },
      ],
    },
    {
      id: 4,
      label: '設定',
      icon: <FaChevronDown />,
      subItems: [
        { id: 4.1, label: 'サブメニュー4-1', onClick: () => handleSubMenuClick(4.1) },
        { id: 4.2, label: 'サブメニュー4-2', onClick: () => handleSubMenuClick(4.2) },
      ],
    },
  ];

  // 各アコーディオンの開閉状態を管理する（複数のアコーディオンに対応）
  const [openAccordions, setOpenAccordions] = useState<{ [key: number]: boolean }>({});

  // メインメニューがクリックされたときに実行される関数
  const handleMenuClick = (id: number) => {
    // アコーディオンの開閉を切り替える
    setOpenAccordions((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // 現在の状態を反転
    }));
  };

  // サブメニューがクリックされたときに実行される関数
  const handleSubMenuClick = (id: number) => {
    console.log(`サブメニュー項目 ${id} がクリックされました`);
  };

  return (
    <div className="fixed bottom-28  right-7">
      <ul className="space-y-2">
        {/* メインメニューを描画 */}
        {menuItems.map((item) => (
          <li key={item.id} className='relative'>
            <button
              onClick={() => handleMenuClick(item.id)} // 各アコーディオンの開閉をトグル
              className="
                w-12 h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-full
                flex items-center justify-center shadow-lg focus:outline-none
              "
            >
              {/* アコーディオンが開いている場合、アイコンを変更 */}
              {openAccordions[item.id] ? <FaChevronUp /> : item.icon}
            </button>

            {/* アコーディオンメニューの表示 */}
            {item.subItems && openAccordions[item.id] && (
              <ul className="ml-1 mt-2 space-y-1 absolute bottom-1  right-20 bg-blue-200  w-36">
                {item.subItems.map((subItem) => (
                  <div className="">
                    <li key={subItem.id} className="flex">
                      <button
                        onClick={subItem.onClick}
                        className="
                          w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-full
                          flex items-center justify-center shadow-md focus:outline-none
                        "
                        >

                      </button>
                      {subItem.label}
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

export default FloatingActionMenuAccordion2;
