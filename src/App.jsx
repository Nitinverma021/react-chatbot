import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Loader from './components/Loader';
import ChatInput from './components/ChatInput';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import ChatSidebar from './components/ChatSidebar';
import WelcomeScreen from './components/WelcomeScreen';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { generateResponse } from './services/aiService';
import { addMessage, getMessages, createChat, getUserChats } from './services/chatService';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import './App.css';

const App = () => {
  const [message, setMessage] = useState('');
  const [isResponseScreen, setisResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [chats, setChats] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const loadChats = async () => {
      try {
        const userChats = await getUserChats(user.uid);
        setChats(userChats);
        if (userChats.length > 0 && !currentChatId) {
          await loadChat(userChats[0].id);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    loadChats();
  }, [user]);

  const loadChat = async (chatId) => {
    try {
      setLoading(true);
      const chatMessages = await getMessages(chatId, user.uid);
      setMessages(chatMessages);
      setCurrentChatId(chatId);
      setisResponseScreen(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!user) return setError("Please sign in to send messages");
    if (!message.trim()) return;

    setLoading(true);
    try {
      let chatId = currentChatId;
      if (!chatId) {
        chatId = await createChat(user.uid, message);
        setCurrentChatId(chatId);
      }

      const userMsg = {
        type: 'userMsg',
        text: message,
        userId: user.uid,
        timestamp: new Date()
      };
      await addMessage(chatId, userMsg);

      const response = await generateResponse(message);
      const aiMsg = {
        type: 'responseMsg',
        text: response,
        userId: user.uid,
        timestamp: new Date()
      };
      await addMessage(chatId, aiMsg);

      setMessages((prev) => [...prev, userMsg, aiMsg]);
      setMessage('');
      setisResponseScreen(true);

      const updatedChats = await getUserChats(user.uid);
      setChats(updatedChats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionClick = (q) => {
    setMessage(q);
    handleSend();
  };

  const newChat = () => {
    setisResponseScreen(false);
    setMessages([]);
    setCurrentChatId(null);
    setError(null);
  };

  const ChatComponent = () => (
    <div className="flex h-screen overflow-hidden bg-[#0E0E0E] text-white">
      <ChatSidebar
        chats={chats}
        currentChatId={currentChatId}
        onChatSelect={loadChat}
        onNewChat={newChat}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* <div className="flex-1 flex flex-col lg:pl-72"> */}
      <div className="flex-1 flex flex-col ">
        <ChatHeader onNewChat={newChat} />

        <main className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader loading={true} />
            </div>
          ) : isResponseScreen ? (
            <div className="flex flex-col h-full pb-32 overflow-y-auto px-4 lg:px-8 py-4 messages">
              {messages?.map((msg, index) => (
                <ChatMessage key={index} type={msg.type} text={msg.text} />
              ))}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <WelcomeScreen onQuestionClick={handleQuestionClick} />
            </div>
          )}
        </main>

        <footer className="border-t border-gray-800 bg-[#121212] p-4">
          <ChatInput message={message} setMessage={setMessage} handleSend={handleSend} />
        </footer>
      </div>
    </div>
  );

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={user ? <ChatComponent /> : <Navigate to="/sign-in" />} />
        <Route path="/sign-in" element={!user ? <SignIn /> : <Navigate to="/" />} />
        <Route path="/sign-up" element={!user ? <SignUp /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
