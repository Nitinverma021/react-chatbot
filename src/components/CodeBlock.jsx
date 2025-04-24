import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';
import { IoCopyOutline, IoCheckmark } from 'react-icons/io5';

const CodeBlock = ({ code, language = 'javascript', theme = 'dark' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-gray-700 bg-[#1a1a1a] relative group">
      <div className="flex justify-between items-center px-4 py-2 bg-[#2a2a2a]">
        <span className="text-sm text-gray-400">{language}</span>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-white transition-colors relative"
          title="Copy code"
        >
          {copied ? <IoCheckmark size={20} /> : <IoCopyOutline size={20} />}
          {copied && (
            <span className="absolute -top-7 right-0 bg-green-600 text-white text-xs px-2 py-1 rounded shadow-md animate-fadeIn">
              Copied!
            </span>
          )}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={theme === 'dark' ? vscDarkPlus : prism}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.875rem',
          lineHeight: '1.5',
          background: 'transparent',
        }}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
