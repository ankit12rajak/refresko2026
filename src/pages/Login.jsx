import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Login.css'

// Hardcoded credentials
const VALID_EMAIL = 'student@skf.in'
const VALID_PASSWORD = 'Student@12345'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    document.body.classList.add('system-cursor')

    // Check if already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    const profileCompleted = localStorage.getItem('profileCompleted')
    
    if (isAuthenticated && profileCompleted === 'true') {
      navigate('/dashboard')
    } else if (isAuthenticated && profileCompleted !== 'true') {
      navigate('/profile-setup')
    }

    return () => {
      document.body.classList.remove('system-cursor')
    }
  }, [navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (error) {
      setError('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate authentication delay
    setTimeout(() => {
      if (formData.email === VALID_EMAIL && formData.password === VALID_PASSWORD) {
        // Authentication successful
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('loginEmail', formData.email)
        
        // Check if profile is completed
        const profileCompleted = localStorage.getItem('profileCompleted')
        
        if (profileCompleted === 'true') {
          navigate('/dashboard')
        } else {
          navigate('/profile-setup')
        }
      } else {
        // Authentication failed
        setError('Invalid credentials. Please try again.')
        setIsLoading(false)
      }
    }, 800)
  }

  return (
    <div className="auth-page">
      <div className="hex-grid-overlay" />
      
      <Link to="/" className="back-home">
        <span>← Back to Home</span>
      </Link>

      <motion.div
        className="auth-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="auth-header">
          <motion.div
            className="auth-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="lock-icon">🔐</div>
          </motion.div>
          
          <motion.h1
            className="auth-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            SKF STUDENT LOGIN
          </motion.h1>
          
          <motion.p
            className="auth-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Welcome back! Access exclusive content and manage your profile
          </motion.p>
        </div>

        <motion.form
          className="auth-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {error && (
            <motion.div
              className="error-banner"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <div className="demo-credentials">
            <p className="demo-label">Demo Credentials:</p>
            <p className="demo-info">Email: <span>student@skf.in</span></p>
            <p className="demo-info">Password: <span>Student@12345</span></p>
          </div>

          <div className="form-group">
            <label htmlFor="email">SKF Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@skf.in"
              required
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" disabled={isLoading} />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-link">Forgot Password?</a>
          </div>

          <button type="submit" className="auth-btn" disabled={isLoading}>
            <span>{isLoading ? 'LOGGING IN...' : 'LOGIN'}</span>
          </button>
        </motion.form>

        <motion.div
          className="auth-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <p className="auth-divider">
            <span>Not an SKF student?</span>
          </p>
          <Link to="/register" className="switch-link">
            Register for events as a participant →
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login
