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
//     <section className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-[#121212] to-[#1f1f1f] text-white">
//       <h1 className="text-5xl font-extrabold mb-10 tracking-tight bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
//         InfoWise
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-5xl">
//         {questions.map((item, index) => (
//           <button
//             key={index}
//             onClick={() => onQuestionClick(item.question)}
//             className="group relative bg-[#1e1e1e] hover:bg-[#2a2a2a] transition-all duration-300 rounded-2xl p-6 h-[150px] flex flex-col justify-between shadow-lg hover:shadow-blue-400/20 border border-transparent hover:border-blue-500/30"
//             aria-label={item.text}
//           >
//             <p className="text-base sm:text-lg font-medium text-gray-200 group-hover:text-white transition duration-200">
//               {item.text}
//             </p>
//             <span className="absolute right-5 bottom-5 text-3xl text-blue-400 group-hover:scale-110 transition-transform duration-200">
//               {item.icon}
//             </span>
//           </button>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default WelcomeScreen;





import { IoCodeSlash } from 'react-icons/io5';
import { BiPlanet } from 'react-icons/bi';
import { FaPython } from 'react-icons/fa';
import { TbMessageChatbot } from 'react-icons/tb';

const WelcomeScreen = ({ onQuestionClick }) => {
  const questions = [
    {
      text: "What is coding? How can we learn it?",
      icon: <IoCodeSlash />,
      question: "What is coding?"
    },
    {
      text: "Which is the red planet of the solar system?",
      icon: <BiPlanet />,
      question: "Which is the red planet of the solar system?"
    },
    {
      text: "In which year was Python invented?",
      icon: <FaPython />,
      question: "In which year was Python invented?"
    },
    {
      text: "How can we use AI for adoption?",
      icon: <TbMessageChatbot />,
      question: "How can we use AI for adoption?"
    }
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-[#121212] to-[#1f1f1f] text-white">
      <h1 className="text-5xl font-extrabold mb-10 tracking-tight bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
        InfoWise
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-5xl">
        {questions.map((item, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(item.question)}
            className="group relative bg-[#1e1e1e] hover:bg-[#2a2a2a] transition-all duration-300 rounded-2xl p-6 h-[150px] flex flex-col justify-between shadow-lg hover:shadow-blue-400/20 border border-transparent hover:border-blue-500/30"
            aria-label={item.text}
          >
            <p className="text-base sm:text-lg font-medium text-gray-200 group-hover:text-white transition duration-200">
              {item.text}
            </p>
            <span className="absolute right-5 bottom-5 text-3xl text-blue-400 group-hover:scale-110 transition-transform duration-200">
              {item.icon}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default WelcomeScreen;
