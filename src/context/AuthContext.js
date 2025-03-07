import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  getCurrentUser
} from '../firebase';

// Create the Auth Context
const AuthContext = createContext();

// Hook to use the Auth Context
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component that wraps your app and makes auth object available to any child component that calls useAuth().
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Sign up function
  async function register(email, password, displayName) {
    try {
      setError('');
      const userCredential = await createUserWithEmailAndPassword(email, password);
      await updateProfile(userCredential.user, { displayName });
      return userCredential.user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Login function
  async function login(email, password) {
    try {
      setError('');
      const userCredential = await signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Logout function
  async function logout() {
    try {
      setError('');
      await signOut();
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Password reset function
  async function resetPassword(email) {
    try {
      setError('');
      await sendPasswordResetEmail(email);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Update user profile
  async function updateUserProfile(profileData) {
    try {
      setError('');
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, profileData);
        setCurrentUser({ ...currentUser, ...profileData });
      } else {
        throw new Error("No user is signed in");
      }
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // The value object that will be passed to any component using this context
  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

