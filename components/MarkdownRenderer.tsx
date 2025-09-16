'use client'

import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import 'katex/dist/katex.min.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const preprocessMarkdown = (text: string): string => {
  if (!text) return '';

  const lines = text.split('\n');
  let inCodeBlock = false;

  const processedLines = lines.map(line => {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      return line;
    }

    if (inCodeBlock) {
      return line;
    }

    // 修正后的正则表达式：
    // ^         - 匹配行首
    // [\t ]+    - 匹配一个或多个制表符或空格（贪婪模式）
    // ([^-\s]) - 确保缩进后的第一个字符不是连字符(-)或空格，避免重复处理已经是列表的行
    // (.*)      - 捕获该行余下的所有内容
    const match = line.match(/^[\t ]+([^-*\s].*)/);
    
    if (match) {
      // 如果匹配成功，将其转换为 "- " 加上捕获到的内容
      // match[1] 是第一个捕获组，即去除了所有前导空白的文本
      return `- ${match[1]}`;
    }

    return line;
  });

  return processedLines.join('\n');
};

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  if (!content) {
    return <p>No content available.</p>;
  }

  const processedContent = preprocessMarkdown(content);
  
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          // 我们不再需要自定义 p 和 li 的渲染器来处理制表符
          // 因为它们已经被预处理器转换了
          h1: ({node, ...props}) => <h1 {...props} />,
          h2: ({node, ...props}) => <h2 {...props} />,
          h3: ({node, ...props}) => <h3 {...props} />,
          h4: ({node, ...props}) => <h4 {...props} />,
          h5: ({node, ...props}) => <h5 {...props} />,
          h6: ({node, ...props}) => <h6 {...props} />,
          
          img: ({node, ...props}) => <img {...props} />,
          a: ({node, ...props}) => <a {...props} />,
          
          pre: ({node, children, ...props}) => {
            let codeContent = '';
            let language = '';
            const codeElement = React.Children.toArray(children).find(
              (child: any) => child?.type === 'code'
            ) as any;
            if (codeElement) {
              codeContent = String(codeElement.props.children).replace(/\n$/, '');
              const className = codeElement.props.className || '';
              const match = /language-(\w+)/.exec(className);
              language = match ? match[1] : 'text';
            }
            return (
              <div className="code-block-wrapper">
                <div className="code-block-header">
                  <span className="code-block-lang">{language}</span>
                </div>
                <pre {...props}>{children}</pre>
              </div>
            );
          },
          
          code: ({node, ...props}) => <code {...props} />,
          blockquote: ({node, ...props}) => <blockquote {...props} />,
          strong: ({node, ...props}) => <strong {...props} />,
          em: ({node, ...props}) => <em {...props} />,
          ul: ({node, ...props}) => <ul {...props} />,
          ol: ({node, ...props}) => <ol {...props} />,
          li: ({node, ...props}) => <li {...props} />,
          table: ({node, ...props}) => <table {...props} />,
          th: ({node, ...props}) => <th {...props} />,
          td: ({node, ...props}) => <td {...props} />,
          hr: ({node, ...props}) => <hr {...props} />,
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}