import React from 'react';
import AnchorTag from '../atoms/AnchorTag';
import CodeBlock from '../atoms/CodeBlock';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// マルチラインのメッセージを表示するコンポーネント
const MultiLineBody = ({ body }: { body: string }) => {
  // マルチラインのメッセージを改行で分割して表示
  const texts = body.split('\\n\\n').map((item, index) => {
    // console.log(item);

    // マークダウンの改行コードを変換
    item = item.replace(/\\n/g, '\n');
    // マークダウンのリンクを変換
    return (
      <React.Fragment key={index}>
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                  a: ({...props}) => <AnchorTag {...props} />,
                  code: ({className, children, ...props}) => (
                    <CodeBlock className={className} {...props}>
                      {children}
                    </CodeBlock>
                  ),
                }}
            >{item}</ReactMarkdown>
      </React.Fragment>
    );
  });
  return <div>{texts}</div>;
};

export default MultiLineBody;