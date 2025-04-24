import { IoAddCircle } from 'react-icons/io5';
import { IoLogOut } from 'react-icons/io5';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ChatHeader = ({ onNewChat }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
    }
  };

  return (
    // <header className="sticky top-0 z-20 bg-gradient-to-r from-[#0e0e0e] to-[#1a1a1a] border-b border-blue-500/20 backdrop-blur-sm shadow-sm">
    <header className="sticky  top-0 z-20 bg-gradient-to-r from-[#0e0e0e] to-[#1a1a1a] border-b border-blue-500/20 backdrop-blur-sm shadow-sm">
      <div className="flex items-center justify-center w-full h-full px-4 py-4">
        <div className="max-w-5xl w-full flex items-center justify-between">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text tracking-tight">
            InfoWise
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onNewChat}
              className="flex items-center gap-2 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-xl text-white font-medium text-sm shadow-lg transition-all duration-300 active:scale-95"
            >
              <IoAddCircle className="text-xl" />
              <span className="hidden sm:inline">New Chat</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-white font-medium text-sm shadow-lg transition-all duration-300 active:scale-95"
              title="Logout"
            >
              <IoLogOut className="text-xl" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
