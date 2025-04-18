import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  where,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';

// Create a new chat session
export const createChat = async (userId, firstMessage) => {
  try {
    if (!userId) {
      throw new Error('User must be authenticated to create a chat');
    }

    const chatRef = await addDoc(collection(db, 'chats'), {
      userId,
      title: firstMessage.substring(0, 50), // Use first 50 chars of first message as title
      createdAt: new Date(),
      lastUpdated: new Date()
    });

    return chatRef.id;
  } catch (error) {
    console.error('Error creating chat:', error);
    throw error;
  }
};

// Get all chats for a user
export const getUserChats = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User must be authenticated to get chats');
    }

    const chatsRef = collection(db, 'chats');
    const q = query(
      chatsRef,
      where('userId', '==', userId),
      orderBy('lastUpdated', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting chats:', error);
    throw error;
  }
};

// Add a new message to a specific chat
export const addMessage = async (chatId, message) => {
  try {
    if (!message.userId) {
      throw new Error('User must be authenticated to send messages');
    }

    const messageRef = await addDoc(collection(db, `chats/${chatId}/messages`), {
      ...message,
      timestamp: new Date()
    });

    // Update chat's lastUpdated timestamp
    await setDoc(doc(db, 'chats', chatId), {
      lastUpdated: new Date()
    }, { merge: true });

    return messageRef.id;
  } catch (error) {
    console.error('Error adding message:', error);
    throw error;
  }
};

// Get messages for a specific chat
export const getMessages = async (chatId, userId) => {
  try {
    if (!userId) {
      throw new Error('User must be authenticated to get messages');
    }

    const messagesRef = collection(db, `chats/${chatId}/messages`);
    const q = query(
      messagesRef,
      orderBy('timestamp', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting messages:', error);
    throw error;
  }
}; 