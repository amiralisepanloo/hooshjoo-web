// Firebase services index file
// This file centralizes all Firebase exports to simplify imports throughout the app

// Import Firebase config
import { app, firestore, auth, storage } from './config';

// Import Firebase auth services
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  getCurrentUser
} from './auth/auth';

// Import Firebase firestore services
// To be implemented: import { getDocument, setDocument, etc. } from './firestore';

// Import Firebase storage services
// To be implemented: import { uploadFile, downloadFile, etc. } from './storage';

// Import Firebase analytics services
// To be implemented: import { logEvent, etc. } from './analytics';

// Export all Firebase services
export {
  // Core Firebase instances
  app,
  firestore,
  auth,
  storage,
  
  // Auth services
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  getCurrentUser,
  
  // Firestore services will be exported here
  // getDocument, setDocument,
  
  // Storage services will be exported here
  // uploadFile, downloadFile,
  
  // Analytics services will be exported here
  // logEvent,
};

// Default export for convenient importing
export default {
  app,
  firestore,
  auth,
  storage,
  // Auth services
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  getCurrentUser
};

