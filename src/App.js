import { BrowserRouter, Routes, Route, Link, NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import { auth, firestore } from "./firebase";
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HomePage from './pages/home/HomePage';
import CoursesPage from './pages/courses/CoursesPage';

// Header Component
const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <header className="app-header">
      <div className="logo">
        <h1>HooshJoo</h1>
      </div>
      <nav className="main-nav">
        <ul>
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/courses">Courses</NavLink></li>
          <li><NavLink to="/quiz">Quiz</NavLink></li>
          <li><NavLink to="/profile">Profile</NavLink></li>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        {currentUser ? (
          <div className="user-menu">
            <span className="user-greeting">Hello, {currentUser.displayName || 'User'}</span>
            <button onClick={handleLogout} className="btn btn-logout">Logout</button>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-login">Login</Link>
            <Link to="/register" className="btn btn-register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
};
const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>HooshJoo</h3>
          <p>Your advanced learning platform for educational success.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/quiz">Quiz</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@hooshjoo.com</p>
          <p>Phone: +98 123 456 7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HooshJoo. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Page Components

const QuizPage = () => {
  return (
    <div className="page quiz-page">
      <h1>Quiz Platform</h1>
      <div className="quiz-categories">
        {/* Quiz categories will be displayed here */}
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <div className="page profile-page">
      <h1>Your Profile</h1>
      <div className="profile-info">
        {/* Profile information will be displayed here */}
      </div>
    </div>
  );
};

const DashboardPage = () => {
  return (
    <div className="page dashboard-page">
      <h1>Dashboard</h1>
      <div className="dashboard-widgets">
        {/* Dashboard widgets will be displayed here */}
      </div>
    </div>
  );
};

// Layout wrapper component
const MainLayout = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes that require authentication */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
