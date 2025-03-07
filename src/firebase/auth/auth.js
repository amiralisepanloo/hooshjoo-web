import { auth } from "../config";
import {
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  signOut as _signOut,
  sendPasswordResetEmail as _sendPasswordResetEmail,
  onAuthStateChanged as _onAuthStateChanged,
  updateProfile as _updateProfile,
} from "firebase/auth";

/**
 * Creates a new user account with the specified email and password
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise<UserCredential>} A promise that resolves with the user credential
 */
export const createUserWithEmailAndPassword = (email, password) => {
  return _createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Signs in a user with the specified email and password
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise<UserCredential>} A promise that resolves with the user credential
 */
export const signInWithEmailAndPassword = (email, password) => {
  return _signInWithEmailAndPassword(auth, email, password);
};

/**
 * Signs out the current user
 * @returns {Promise<void>} A promise that resolves when the sign-out is complete
 */
export const signOut = () => {
  return _signOut(auth);
};

/**
 * Sends a password reset email to the specified email address
 * @param {string} email - The email address to send the password reset to
 * @returns {Promise<void>} A promise that resolves when the email has been sent
 */
export const sendPasswordResetEmail = (email) => {
  return _sendPasswordResetEmail(auth, email);
};

/**
 * Adds an observer for changes to the user's sign-in state
 * @param {function(User|null)} callback - The callback function to run when the auth state changes
 * @returns {Unsubscribe} A function that unsubscribes the observer when called
 */
export const onAuthStateChanged = (callback) => {
  return _onAuthStateChanged(auth, callback);
};

/**
 * Updates a user's profile data
 * @param {User} user - The user whose profile should be updated
 * @param {object} profileData - The profile data to update (displayName and/or photoURL)
 * @returns {Promise<void>} A promise that resolves when the profile has been updated
 */
export const updateProfile = (user, profileData) => {
  return _updateProfile(user, profileData);
};

/**
 * Gets the currently signed-in user
 * @returns {User|null} The currently signed-in user or null if no user is signed in
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

