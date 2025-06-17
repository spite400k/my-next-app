import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type Props = {
  text: string;
  sender: 'user' | 'ai';
};

export const ChatMessage = ({ text, sender }: Props) => {
  const isUser = sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2 w-full`}>
      <div
        className={`
          max-w-[80%] px-4 py-3 rounded-xl shadow-sm
          ${isUser ? 'bg-blue-100 text-gray-900' : 'bg-gray-100 text-gray-800'}
        `}
      >
        {text === '...' ? (
          <div className="flex items-center gap-2">
            <Loader2 className="animate-spin w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">考え中...</span>
          </div>
        ) : (
          <ReactMarkdown className="prose prose-sm">{text}</ReactMarkdown>
        )}
      </div>
    </div>
  );
};
