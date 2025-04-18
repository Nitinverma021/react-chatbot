
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
    <div className={`fixed top-0 left-0 h-screen bg-[#121212] text-white border-r border-gray-800 z-40 transition-transform duration-300 ease-in-out 
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
      lg:translate-x-0 lg:relative lg:w-72`}
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
        <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
          {chats.map(chat => (
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



// import { IoCodeSlash } from 'react-icons/io5';
// import { BiPlanet } from 'react-icons/bi';
// import { FaPython } from 'react-icons/fa';
// import { TbMessageChatbot } from 'react-icons/tb';

// const WelcomeScreen = ({ onQuestionClick }) => {
//   const questions = [
//     {
//       text: "What is coding? How can we learn it?",
//       icon: <IoCodeSlash />,
//       question: "What is coding?"
//     },
//     {
//       text: "Which is the red planet of the solar system?",
//       icon: <BiPlanet />,
//       question: "Which is the red planet of the solar system?"
//     },
//     {
//       text: "In which year was Python invented?",
//       icon: <FaPython />,
//       question: "In which year was Python invented?"
//     },
//     {
//       text: "How can we use AI for adoption?",
//       icon: <TbMessageChatbot />,
//       question: "How can we use AI for adoption?"
//     }
//   ];

//   return (
//     <section className="min-h-screen w-full bg-gradient-to-br from-[#121212] to-[#1f1f1f] text-white flex flex-col items-center justify-center px-4 py-10">
//       <div className="w-full max-w-5xl mx-auto text-center">
//         <h1 className="text-5xl font-extrabold mb-10 tracking-tight bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
//           InfoWise
//         </h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
//           {questions.map((item, index) => (
//             <button
//               key={index}
//               onClick={() => onQuestionClick(item.question)}
//               className="group relative bg-[#1e1e1e] hover:bg-[#2a2a2a] transition-all duration-300 rounded-2xl p-6 h-[150px] flex flex-col justify-between shadow-lg hover:shadow-blue-400/20 border border-transparent hover:border-blue-500/30"
//               aria-label={item.text}
//             >
//               <p className="text-base sm:text-lg font-medium text-gray-200 group-hover:text-white transition duration-200">
//                 {item.text}
//               </p>
//               <span className="absolute right-5 bottom-5 text-3xl text-blue-400 group-hover:scale-110 transition-transform duration-200">
//                 {item.icon}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WelcomeScreen;
