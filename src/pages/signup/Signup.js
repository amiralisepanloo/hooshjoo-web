import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

// styles
import './Signup.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()
  const { signup } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // validation checks
    if (!email || !password || !confirmPassword) {
      setError('All fields are required')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    try {
      setIsPending(true)
      
      // This would be replaced with your actual signup function
      await signup(email, password)
      
      setIsPending(false)
      navigate('/') // Redirect to home page after successful signup
    } catch (err) {
      setError(err.message || 'An error occurred during signup')
      setIsPending(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      
      <label>
        <span>Email:</span>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
          required
        />
      </label>
      
      <label>
        <span>Password:</span>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
          required
        />
      </label>
      
      <label>
        <span>Confirm Password:</span>
        <input 
          type="password" 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          value={confirmPassword}
          required
        />
      </label>

      {!isPending && <button className="btn">Sign up</button>}
      {isPending && <button className="btn" disabled>Loading...</button>}
      
      {error && <div className="error">{error}</div>}
    </form>
  )
}

