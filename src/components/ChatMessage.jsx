import CodeBlock from './CodeBlock';

const ChatMessage = ({ type = 'user', text = '' }) => {
  const formatMessage = (message) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(message)) !== null) {
      // Push preceding plain text
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: message.slice(lastIndex, match.index) });
      }

      // Push code block
      parts.push({
        type: 'code',
        language: match[1]?.trim() || 'javascript',
        content: match[2]?.trim() || ''
      });

      lastIndex = match.index + match[0].length;
    }

    // Push remaining text after last code block
    if (lastIndex < message.length) {
      parts.push({ type: 'text', content: message.slice(lastIndex) });
    }

    return parts;
  };

  const messageParts = formatMessage(text);

  return (
    <div
      className={`${type} p-4 animate-fadeIn`}
      style={{
        direction: 'ltr',
        unicodeBidi: 'isolate'
      }}
    >
      {messageParts.map((part, index) =>
        part.type === 'code' ? (
          <CodeBlock key={index} code={part.content} language={part.language} />
        ) : (
          <p
            key={index}
            className="whitespace-pre-wrap text-left text-white leading-relaxed"
            style={{
              direction: 'ltr',
              unicodeBidi: 'isolate',
              textAlign: 'left'
            }}
          >
            {part.content}
          </p>
        )
      )}
    </div>
  );
};

export default ChatMessage;
