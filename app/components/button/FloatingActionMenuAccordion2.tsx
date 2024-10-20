import { chatInputState } from '@/app/state/chatInputState';
import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaShare, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaHandPointDown, FaHandPointLeft } from 'react-icons/fa6';
import { useRecoilState } from 'recoil';

interface MenuItem {
  id: number;
  label: string;
  icon: React.ReactNode;
  subItems?: SubMenuItem[];
}

interface SubMenuItem {
  id: number;
  label: string;
  onClick: (word : string) => void;
  prompt: string;
}

const FloatingActionMenuAccordion2: React.FC = () => {
  // メニュー項目のリスト
  const menuItems: MenuItem[] = [
    {
      id: 1,
      label: 'SEOキーワード抽出　',
      icon: <FaHandPointLeft />,
      subItems: [
        { id: 1.1, label: '関連するキーワードを探す　', onClick: (word : string) => handleSubMenuClick(word) , prompt : "次のワードに関連するSEOキーワードを10個特定してください。　入力："},
        { id: 1.2, label: 'キーワードの「検索意図」を表にする　', onClick: (word : string) => handleSubMenuClick(word) , prompt : "次のワードの検索意図（Buyクエリ、Knowクエリ、Doクエリ、Goクエリ）を表に分類してください。　入力："},
        { id: 1.3, label: 'キーワード戦略を調査する　', onClick: (word : string) => handleSubMenuClick(word) , prompt : "次のワードの上位5つのSEOキーワード戦略を調査してください。　入力："},
        { id: 1.4, label: '検索ボリュームと難易度を指定する　', onClick: (word : string) => handleSubMenuClick(word) , prompt : "あなたが SEOリーダーであると仮定します。次のワードについて、検索ボリュームが多く、難易度は低いキーワードをいくつか提案してください。　入力："},
        { id: 1.5, label: 'ロングテールキーワードを提案させる　', onClick: (word : string) => handleSubMenuClick(word) , prompt : "あなたがコンテンツマーケターと仮定します。次のワードに関連するロングテールで高ボリューム、低難度のキーワードを提供してください。　入力："},
        { id: 1.6, label: 'キーワードからトピックをリスト化させる　', onClick: (word : string) => handleSubMenuClick(word) , prompt : "あなたがオンラインマーケティングマネージャーと仮定します。次のワードに関連する広範なトピックのリストを作成し、各トピックを顧客が使用すると思われるフレーズのリストで展開してください。　入力："},
      ],
    },
    {
      id: 2,
      label: 'SEOに強いタイトルを作る　',
      icon: <FaHandPointLeft />,
      subItems: [
        { id: 2.1, label: 'キーワードからSEOに強いタイトルを生成する', onClick: (word : string) => handleSubMenuClick(word) ,prompt : "以下のSEOキーワードのリストに関連する、クリックされるブログのタイトルを提案してください。"},
        { id: 2.2, label: 'ペルソナを指定してタイトルを生成する', onClick: (word : string) => handleSubMenuClick(word) ,prompt : "「40代　女性」を対象としたキーワード「ダイエット　オススメ　ジム」のブログ投稿タイトルのアイデアを5つ提案してください"},
        { id: 2.3, label: '印象的なブログ記事のタイトルを生成する', onClick: (word : string) => handleSubMenuClick(word) ,prompt : "「40代女性にオススメのダイエットジム：理想の体型を手に入れる方法」というタイトルのブログ投稿をよりキャッチーなものにして、5つあげてください。"},
        { id: 2.4, label: 'サブタイトルを生成する', onClick: (word : string) => handleSubMenuClick(word) ,prompt : "タイトルが「40代女性にオススメのダイエットジム：理想の体型を手に入れる方法」のブログ記事に対して、キャッチーで最大60文字のサブタイトルを10個書いてください。"},
      ],
    },
    {
      id: 3,
      label: '記事のアウトラインを生成　',
      icon: <FaHandPointLeft />,
      subItems: [
        { id: 3.1, label: 'キーワードをもとにアウトラインを生成する', onClick: (word : string) => handleSubMenuClick(word) ,prompt : "キーワード「40代　女性　ダイエット」を対象とした包括的でSEO最適化されたブログ記事のアウトラインを作成し、「40代　女性　ダイエット」のユーザーを対象として、3000〜5000文字の長さにしてください。"},
        { id: 3.2, label: '特定のサービスや製品の記事アウトラインを生成する', onClick: (word : string) => handleSubMenuClick(word) ,prompt : "あなたはコンテンツマーケターと仮定します。キーワード「40代　女性　プロテイン」に関連するさまざまな製品やサービスを比較・対比し、中立なトーンで消費者を対象とし、SEO最適化されたブログ記事のアウトラインを作成し、3000〜5000文字の長さにしてください。"},
        { id: 3.3, label: '特定の製品・サービスのステップバイステップを生成する', onClick: (word : string) => handleSubMenuClick(word) ,prompt : "あなたはSEOに精通したテクニカルライターと仮定します。初心者を対象とした親しみやすく助けになる雰囲気で3000〜5000文字の長さにして、「40代女性向けヨガバンド」の使用方法に関するステップバイステップガイドの詳しいブログ記事のアウトラインを作成してください。"},
        { id: 3.4, label: 'ブログ記事のアイデアを表で生成させる', onClick: (word : string) => handleSubMenuClick(word) ,prompt : "「40代　女性　ダイエット」に関するブログ記事の主なアイデアをリストアップし、表で提示してください。"},
      ],
    },
    {
      id: 4,
      label: 'SEOに強い記事本文の作成　',
      icon: <FaHandPointLeft />,
      subItems: [
        { id: 4.1, label: '記事作成のポイントを要約する', onClick: (word : string) => handleSubMenuClick(word) , prompt : "「40代女性にオススメのダイエットジム：理想の体型を手に入れる方法」に関するブログ記事の重要なポイントを要約してください。"},
        { id: 4.2, label: '記事の小見出しを生成する', onClick: (word : string) => handleSubMenuClick(word) , prompt : "「40代女性にオススメのダイエットジム：理想の体型を手に入れる方法」というタイトルのブログ記事に8つの小見出しを作成してください。"},
        { id: 4.3, label: 'ペルソナを指定して見出しを生成する', onClick: (word : string) => handleSubMenuClick(word) , prompt : "あなたはコンテンツクリエーターと仮定します。健康志向の40代女性をターゲットにしたブログ記事の親しみやすい見出しを作成します。「腹筋マシン」がダイエットに有効で、理想に近付くことを強調してください。"},
        { id: 4.4, label: '記事の導入文を生成する', onClick: (word : string) => handleSubMenuClick(word) , prompt : "「40代女性にオススメのダイエットジム：理想の体型を手に入れる方法」というタイトルのブログ記事の短い導入文を作成し、質問から始めて、メリットに焦点を当ててください。"},
        { id: 4.5, label: 'よくある質問を生成する', onClick: (word : string) => handleSubMenuClick(word) , prompt : "「40代　女性　ダイエット」に関連する 5 つのよくある質問のリストを作ってください。"},
        { id: 4.6, label: '記事のメタディスクリプションを生成する', onClick: (word : string) => handleSubMenuClick(word) , prompt : "（記事の本文など入力）上記の記事のメタディスクリプションを提案し、ユーザーに分かりやすく、行動喚起を含めてください。"},
      ],
    },
  ];
  
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen); // メニューの表示/非表示をトグルする
  };
  
  // 各アコーディオンの開閉状態を管理する（複数のアコーディオンに対応）
  const [openAccordions, setOpenAccordions] = useState<{ [key: number]: boolean }>({});

  // メインメニューがクリックされたときに実行される関数
  const handleMenuClick = (id: number) => {
    setOpenAccordions((prevState) => {
      const updatedState = { ...prevState };

      // 全てのアコーディオンを閉じる
      for (let i = 1; i <= 4; i++) {
        if (i !== id) {
          updatedState[i] = false;
        }
      }

      // クリックされたアコーディオンの開閉を切り替える
      updatedState[id] = !prevState[id];

      return updatedState;
    });
    
  };

  const [chatInput, setChatInput] = useRecoilState(chatInputState)
  // サブメニューがクリックされたときに実行される関数
  const handleSubMenuClick = (word: string) => {
    setChatInput({ content: word });
    setIsOpen(false); // メニューの表示/非表示をトグルする
    setOpenAccordions((prevState) => {
      const updatedState = { ...prevState };

      // 全てのアコーディオンを閉じる
      for (let i = 1; i <= 4; i++) {
          updatedState[i] = false;
      }
      return updatedState;
    });
    
    
  };

  return (
    <div className="fixed bottom-28  right-7">

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
          <ul className="space-y-2 absolute bottom-20 right-0 w-max  bg-gray-100 p-5">
            {/* メインメニューを描画 */}
            {menuItems.map((item) => (
              <li key={item.id} className='flex gap-1 mb-2 relative'>
                <button
                  onClick={() => handleMenuClick(item.id)} // 各アコーディオンの開閉をトグル
                  className="
                    w-12 h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-full
                    flex items-center justify-center shadow-lg focus:outline-none">
                  {/* アコーディオンが開いている場合、アイコンを変更 */}
                  {openAccordions[item.id] ? <FaChevronUp /> : item.icon}

                </button>
                <div className='my-auto pl-3 rounded'>{item.id} . {item.label}</div>
                
                {/* アコーディオンメニューの表示 */}
                {item.subItems && openAccordions[item.id] && (
                  <ul className="space-y-2 absolute w-max bottom-1  right-80 bg-blue-200 p-5">
                    {item.subItems.map((subItem) => (
                      <div className="">
                        <li key={subItem.id} className="flex  gap-1 mb-2 ">
                          <button
                            onClick={()=>subItem.onClick(subItem.prompt)}
                            className="
                              w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-full
                              flex items-center justify-center shadow-md focus:outline-none">
                          <FaHandPointDown />
                          </button>
                          <div className='my-auto pl-3 rounded'>{subItem.id} . {subItem.label}</div>
                        </li>
                      </div>
                    ))}
                      <div className="absolute bottom-1 left-full transform -translate-y-1/2 border-[10px] border-transparent border-l-blue-200"></div>

                  </ul>
                )}
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

export default FloatingActionMenuAccordion2;
