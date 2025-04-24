import { IoSend } from 'react-icons/io5';
import { FaRegSmile } from 'react-icons/fa';
import React, { useRef, useState } from 'react';
import EmojiPicker from './EmojiPicker';
import ChatTextArea from './ChatTextArea';

const ChatInput = ({ message, setMessage, handleSend }) => {
  const bottomRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMessageSend = () => {
    if (!message.trim()) return;
    handleSend();
    scrollToBottom();
  };

  return (
    // <div className="fixed bottom-0 left-0 right-0 bg-[#0E0E0E] px-4 py-3 z-40 border-t border-gray-800">
    <div className="fixed bottom-0 left-0 right-0 transparent px-4 py-3 z-40 border-t border-none">
      <div className="max-w-4xl mx-auto">
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="relative mb-2">
            <EmojiPicker 
              show={showEmojiPicker}
              onSelect={handleEmojiSelect}
              onClose={() => setShowEmojiPicker(false)}
            />
          </div>
        )}

        {/* Chat Input Area */}
        <div className="relative bg-[#181818] rounded-2xl shadow-md">
          <div className="flex items-end gap-2 px-3 py-2">
            {/* Emoji Button */}
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 text-yellow-400 hover:text-yellow-500 transition-colors"
            >
              <FaRegSmile size={20} />
            </button>

            {/* Message Input */}
            <ChatTextArea 
              message={message}
              setMessage={setMessage}
              handleSend={handleMessageSend}
            />

            {/* Send Button */}
            <button
              onClick={handleMessageSend}
              disabled={!message.trim()}
              className={`p-2 rounded-full transition-all duration-200 ${
                message.trim()
                  ? 'text-green-500 hover:bg-[#2a2a2a]'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <IoSend size={20} />
            </button>
          </div>
        </div>
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatInput;
