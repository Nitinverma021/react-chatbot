import React, { useRef, useEffect } from 'react';

const ChatTextArea = ({ message, setMessage, handleSend, onResize }) => {
  const textareaRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
      if (onResize) onResize();
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [message]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      // Enhanced text direction settings
      textareaRef.current.setAttribute('dir', 'ltr');
      textareaRef.current.style.textAlign = 'left';
      textareaRef.current.style.direction = 'ltr';
      textareaRef.current.style.unicodeBidi = 'isolate';
    }
  }, []);

  return (
    <div className="flex-1 relative" >
      <input
        ref={textareaRef}
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        rows="1"
        className="w-full py-4 px-2 bg-transparent cursor-text text-white resize-none focus:outline-none rounded-lg"
        placeholder="Type something..."
        style={{
          minHeight: '50px',
          maxHeight: '200px',
          direction: 'ltr',
          textAlign: 'left',
          unicodeBidi: 'isolate',
          writingMode: 'horizontal-tb'
        }}
        spellCheck="false"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        lang="en"
        dir="ltr"
      />
    </div>
  );
};

export default ChatTextArea; 