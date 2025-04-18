import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const createUserProfile = async (userId, userData) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      name: userData.name,
      email: userData.email,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}; 