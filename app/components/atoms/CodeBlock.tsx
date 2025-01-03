import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type CodeBlockProps = {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ inline, className, children }) => {
  if (inline) {
    return <code className={className}>{children}</code>;
  }

  const match = /language-(\w+)/.exec(className || '');
  const lang = match ? match[1] : '';

  return (
    <SyntaxHighlighter style={atomDark} language={lang}>
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
