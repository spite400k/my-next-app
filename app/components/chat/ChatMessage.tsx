import { Loader2, Copy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

type Props = {
  text: string;
  sender: 'user' | 'ai';
  timestamp?: string | Date;
};

export const ChatMessage = ({ text, sender, timestamp }: Props) => {
  const isUser = sender === 'user';
  const formattedTime = dayjs(timestamp ?? new Date()).format('YYYY/MM/DD HH:mm');
  const [copiedBlock, setCopiedBlock] = useState(false);

  const markdownComponents = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');

      const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText(String(children));
          setCopiedBlock(true);
          setTimeout(() => setCopiedBlock(false), 1500);
        } catch {
          alert('コピーに失敗しました');
        }
      };

      if (!inline && match) {
        return (
          <div className="relative my-2 rounded border border-gray-300 bg-gray-900 text-white">
            <button
              onClick={handleCopy}
              className="absolute top-1 right-1 p-1 rounded bg-gray-700 hover:bg-gray-600"
              aria-label="コードをコピー"
              type="button"
            >
              <Copy className="w-4 h-4" />
            </button>
            <SyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag="div"
              customStyle={{ margin: 0, paddingTop: '1.5rem', paddingBottom: '1rem', borderRadius: '0.375rem' }}
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
            {copiedBlock && (
              <div className="absolute top-6 right-1 text-xs bg-green-600 text-white rounded px-2 select-none">
                コピーしました！
              </div>
            )}
          </div>
        );
      }

      return (
        <code className="bg-gray-200 px-1 rounded text-sm" {...props}>
          {children}
        </code>
      );
    },

    blockquote({ children }: any) {
      const contentText = children
        .map((child: any) => (typeof child === 'string' ? child : child.props?.children || ''))
        .join('');

      const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText(contentText);
          alert('引用文をコピーしました');
        } catch {
          alert('コピーに失敗しました');
        }
      };

      return (
        <div className="relative my-2 rounded border border-gray-400 bg-gray-100 p-4 italic text-gray-700">
          <button
            onClick={handleCopy}
            className="absolute top-1 right-1 p-1 rounded bg-gray-300 hover:bg-gray-400"
            aria-label="引用文をコピー"
            type="button"
          >
            <Copy className="w-4 h-4" />
          </button>
          <blockquote>{children}</blockquote>
        </div>
      );
    },

    ul({ children }: any) {
      return <ul className="list-disc pl-6 my-2">{children}</ul>;
    },

    ol({ children }: any) {
      return <ol className="list-decimal pl-6 my-2">{children}</ol>;
    },

    li({ children }: any) {
      return <li className="mb-1">{children}</li>;
    },

    a({ href, children }: any) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          {children}
        </a>
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
          <>
            <ReactMarkdown components={markdownComponents}>{text}</ReactMarkdown>
            <div
              className={`flex justify-end items-center space-x-2 mt-1 ${
                isUser ? 'text-white/70' : 'text-gray-500'
              }`}
            >
              <div className="text-xs">{formattedTime}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
