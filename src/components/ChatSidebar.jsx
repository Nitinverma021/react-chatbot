import React from 'react';
import { IoAddCircle, IoMenu, IoClose } from 'react-icons/io5';

const ChatSidebar = ({ chats, currentChatId, onChatSelect, onNewChat, isOpen, onToggle }) => (
  <>
    {/* Mobile Menu Button */}
    <button
      onClick={onToggle}
      className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#181818] rounded-lg text-white shadow-md"
    >
      {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
    </button>

    {/* Sidebar */}
    <div
      className={`fixed top-0 left-0 h-screen bg-[#121212] text-white border-r border-gray-800 z-40 transition-transform duration-300 ease-in-out 
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
      lg:translate-x-0 lg:relative lg:w-72 w-64`}
    >
      <div className="flex flex-col h-full p-4 space-y-4">
        {/* New Chat Button */}
        <button
          onClick={onNewChat}
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md"
        >
          <IoAddCircle className="text-xl" />
          <span className="font-medium">New Chat</span>
        </button>

        {/* Chats List */}
        <div
          className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar"
        >
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => {
                onChatSelect(chat.id);
                if (window.innerWidth < 1024) onToggle();
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm truncate transition-all 
                ${chat.id === currentChatId
                  ? 'bg-[#2a2a2a] text-white'
                  : 'text-gray-300 hover:bg-[#1f1f1f] hover:text-white'}`}
            >
              {chat.title}
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* Overlay for Mobile */}
    {isOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        onClick={onToggle}
      />
    )}
  </>
);

export default ChatSidebar;
