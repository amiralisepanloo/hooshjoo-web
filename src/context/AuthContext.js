import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";
import { auth } from "../firebase";

// 1️⃣ ایجاد کانتکست
const AuthContext = createContext();

// 2️⃣ Hook برای دسترسی آسان به مقدار کانتکست
export function useAuthContext() {
  return useContext(AuthContext);
}

// 3️⃣ ایجاد Provider برای مدیریت وضعیت احراز هویت
export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authIsReady, setAuthIsReady] = useState(false);
  const [error, setError] = useState("");

  // 4️⃣ بررسی تغییرات وضعیت کاربر هنگام لاگین یا خروج
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthIsReady(true);
    });

    return () => unsubscribe();
  }, []);

  // 5️⃣ توابع ورود، ثبت‌نام و خروج
  async function register(email, password, displayName) {
    try {
      setError("");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      setUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  async function login(email, password) {
    try {
      setError("");
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  async function logout() {
    try {
      setError("");
      await signOut(auth);
      setUser(null);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  async function resetPassword(email) {
    try {
      setError("");
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // 6️⃣ مقداردهی به `AuthContext`
  const value = {
    user,
    authIsReady,  // ✅ مقدار `authIsReady` را اینجا اضافه کردیم
    error,
    register,
    login,
    logout,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
