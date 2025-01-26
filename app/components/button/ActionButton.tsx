import { chatInputState } from "@/app/state/chatInputState";
import { ClipboardIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { TfiWrite } from "react-icons/tfi";
import { useSetRecoilState } from "recoil";


const ActionButton = ({ content }: { content: string }) => {

  // チャット入力にセットする
  const setChatInput = useSetRecoilState(chatInputState)
  const handleWiteBlog = (word: string) => {
    word = "次の内容でブログを作成する　自然な文体で書いて　" + word;
    
    setChatInput({ content: word });
  };

  // コピーした
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    setCopiedMessage(text);
    setTimeout(() => setCopiedMessage(null), 2000);
  };
  
  return (
        <div className="relative flex flex-row justify-end w-full">

            {/* ブログを書くボタン */}
            <div className="group ">
            <button className='py-2 pr-1 rounded-md hover:bg-gray-200 transition' onClick={() => handleWiteBlog(content)}>
                <TfiWrite />
            </button>
            <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                この内容で自然な文体でブログを作成する
            </div>
            </div>

            {/* コピーするボタン */}
            <div className="group ">
                <CopyToClipboard text={content} onCopy={() => handleCopy(content)}>
                    <button className="py-1 rounded-md hover:bg-gray-200 transition">
                    <ClipboardIcon className="h-6 w-6 text-gray-500 group-hover:text-gray-700" />
                    </button>
                </CopyToClipboard>
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                    コピーする
                </div>
            </div>
            {/* Copied Message Notification */}
            {copiedMessage && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg animate-fade-in-out">
                    コピーしました！
                </div>
            )}
        </div>
    );
  };
  
  export default ActionButton;