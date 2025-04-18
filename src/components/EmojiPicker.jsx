import React from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const EmojiPicker = ({ onSelect, show, onClose }) => {
  if (!show) return null;

  const handleEmojiSelect = (emoji) => {
    onSelect(emoji);
  };

  return (
    <div className="absolute bottom-full left-0 mb-2 z-50">
      <div className="relative">
        <div className="absolute -bottom-2 left-4 w-4 h-4 bg-[#181818] transform rotate-45" />
        <div className="bg-[#181818] rounded-lg shadow-lg p-2">
          <Picker 
            data={data}
            onEmojiSelect={handleEmojiSelect}
            theme="dark"
            previewPosition="none"
            skinTonePosition="none"
            searchPosition="none"
            maxFrequentRows={2}
          />
        </div>
      </div>
    </div>
  );
};

export default EmojiPicker; 