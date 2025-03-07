import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/AuthContext";  // ✅ اضافه کردن AuthContextProvider
import { auth } from "./firebase";  // ✅ اضافه کردن Firebase برای تست

// Function to register the service worker
const registerServiceWorker = () => {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker
                .register("/service-worker.js")
                .then((registration) => {
                    console.log("ServiceWorker registration successful with scope: ", registration.scope);
                })
                .catch((error) => {
                    console.log("ServiceWorker registration failed: ", error);
                });
        });
    }
};

// ✅ بررسی اتصال Firebase
console.log("🔥 Firebase Initialized:", auth ? "Connected ✅" : "Not Connected ❌");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthContextProvider>  {/* ✅ اضافه کردن این بخش برای جلوگیری از خطا */}
            <App />
        </AuthContextProvider>
    </React.StrictMode>
);

// Register the service worker for production builds
if (process.env.NODE_ENV === "production") {
    registerServiceWorker();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
