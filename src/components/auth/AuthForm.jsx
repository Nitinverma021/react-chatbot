import React from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { createUserProfile } from '../../services/userService';
import FormField from '../FormField';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const authFormSchema = (type) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3, 'Name must be at least 3 characters') : z.string().optional(),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });
};

const AuthForm = ({ type }) => {
  const navigate = useNavigate();
  const isSignIn = type === 'sign-in';

  const formSchema = authFormSchema(type);
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      if (type === 'sign-up') {
        const { name, email, password } = data;

        try {
          // Create the user account
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          // Store additional user data in Firestore
          await createUserProfile(userCredential.user.uid, {
            name,
            email
          });

          // Sign out the user immediately after account creation
          await auth.signOut();

          toast.success('Account created successfully! Please sign in to continue.');
          navigate('/sign-in');
        } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
            toast.error('This email is already registered. Please sign in instead.');
            navigate('/sign-in');
            return;
          }
          throw error;
        }
      } else {
        const { email, password } = data;

        try {
          await signInWithEmailAndPassword(auth, email, password);
          toast.success('Signed in successfully.');
          navigate('/');
        } catch (error) {
          if (error.code === 'auth/user-not-found') {
            toast.error('No account found with this email. Please sign up first.');
            navigate('/sign-up');
            return;
          }
          if (error.code === 'auth/wrong-password') {
            toast.error('Incorrect password. Please try again.');
            return;
          }
          throw error;
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E0E0E] px-4">
      <div className="bg-[#181818] p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {isSignIn ? 'Welcome Back!' : 'Create Account'}
          </h1>
          <p className="text-gray-400">
            {isSignIn 
              ? 'Sign in to continue your conversation' 
              : 'Join us to start chatting with AI'}
          </p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            {!isSignIn && (
              <div className="space-y-2">
                <FormField
                  name="name"
                  label="Name"
                  placeholder="Your name"
                  type="text"
                  icon={<FaUser className="text-gray-400" />}
                />
              </div>
            )}

            <div className="space-y-2">
              <FormField
                name="email"
                label="Email"
                placeholder="Your email address"
                type="email"
                icon={<FaEnvelope className="text-gray-400" />}
              />
            </div>

            <div className="space-y-2">
              <FormField
                name="password"
                label="Password"
                placeholder="Enter your password"
                type="password"
                icon={<FaLock className="text-gray-400" />}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#181818]"
            >
              {isSignIn ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </FormProvider>

        <div className="mt-6 pt-6 border-t border-gray-800">
          <p className="text-center text-gray-400">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => navigate(isSignIn ? '/sign-up' : '/sign-in')}
              className="ml-2 text-blue-500 hover:text-blue-400 font-medium transition-colors duration-200"
            >
              {isSignIn ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm; 