import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
import React, { Suspense, lazy } from 'react'
import { CircularProgress, Box } from '@mui/material'

// styles
import './App.css'

// pages & components
import Navbar from './components/Navbar'

// Lazy loaded components
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))
const Create = lazy(() => import('./pages/create/Create'))
const Login = lazy(() => import('./pages/login/Login'))
const Signup = lazy(() => import('./pages/signup/Signup'))
const Project = lazy(() => import('./pages/project/Project'))
const HomePage = lazy(() => import('./pages/home/HomePage'))

// Loading fallback component
const LoadingFallback = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
    <CircularProgress />
  </Box>
)

function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={user ? <Create /> : <Navigate to="/login" />} />
              <Route path="/projects/:id" element={user ? <Project /> : <Navigate to="/login" />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
