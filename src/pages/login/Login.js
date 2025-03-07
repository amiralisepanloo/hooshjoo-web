import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()
  const { dispatch } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsPending(true)

    try {
      // Basic validation
      if (!email) {
        throw new Error('Email is required')
      }
      if (!password) {
        throw new Error('Password is required')
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }

      // This is where you would normally make an API call to your backend
      // Example: const response = await fetch('/api/login', {...})
      
      // Mocking a successful login for now
      // Replace this with your actual authentication logic
      const response = { 
        ok: true,
        json: () => Promise.resolve({ 
          user: { 
            email,
            displayName: email.split('@')[0],
            uid: '123456'
          },
          token: 'mock-jwt-token'
        })
      }

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      
      // Store user info in local storage
      localStorage.setItem('user', JSON.stringify(data.user))
      
      // Update auth context
      dispatch({ type: 'LOGIN', payload: data.user })
      
      setIsPending(false)
      
      // Redirect to dashboard
      navigate('/')
    } catch (err) {
      setError(err.message)
      setIsPending(false)
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        
        <label>
          <span>Email:</span>
          <input 
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="example@example.com"
          />
        </label>
        
        <label>
          <span>Password:</span>
          <input 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </label>

        {error && <div className="error">{error}</div>}
        
        {!isPending && <button className="btn">Login</button>}
        {isPending && <button className="btn" disabled>Loading...</button>}
      </form>
    </div>
  )
}

