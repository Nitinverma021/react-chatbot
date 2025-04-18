// import { RotatingLines } from "react-loader-spinner";

// const Loader = ({ loading, message = "Thinking..." }) => {
//   return (
//     <div className="flex flex-col items-center gap-4">
//       <RotatingLines
//         strokeColor="white"
//         strokeWidth="5"
//         animationDuration="0.75"
//         width="48"
//         visible={loading}
//       />
//       <p className="text-gray-400 text-sm animate-pulse">{message}</p>
//     </div>
//   );
// };

// export default Loader; 



import { RotatingLines } from "react-loader-spinner";

const Loader = ({ loading, message = "Thinking..." }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl shadow-xl bg-white/10">
        <div className="animate-spin-slow">
          <RotatingLines
            strokeColor="#60A5FA"
            strokeWidth="5"
            animationDuration="0.75"
            width="64"
            visible={true}
          />
        </div>
        <p className="text-blue-300 text-sm font-medium animate-pulse">{message}</p>
      </div>
    </div>
  );
};

export default Loader;
