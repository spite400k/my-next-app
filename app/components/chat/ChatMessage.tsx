import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Components } from 'react-markdown';

type Props = {
  text: string;
  sender: 'user' | 'ai';
};

export const ChatMessage = ({ text, sender }: Props) => {
  const isUser = sender === 'user';

  // Markdownの表示方法を定義
  const markdownComponents: Components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-gray-200 px-1 rounded text-sm" {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`w-[80%] px-4 py-3 rounded-xl whitespace-pre-wrap break-words ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-100 text-black rounded-bl-none'
        }`}
      >
        {text === '...' ? (
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="animate-spin w-4 h-4" />
            <span>考え中...</span>
          </div>
        ) : (
          <ReactMarkdown components={markdownComponents}>
            {text}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};
