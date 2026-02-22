import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Login.css'

const LoginSelection = () => {
  const isLoginDisabled = true

  const blockLoginNavigation = (event) => {
    if (isLoginDisabled) {
      event.preventDefault()
    }
  }

  return (
    <div className="auth-page">
      <div className="hex-grid-overlay" />

      <motion.div
        className="auth-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="auth-header">
          <motion.h1
            className="auth-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            LOGIN AS
          </motion.h1>

          <motion.p
            className="auth-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Choose your login type to continue
          </motion.p>
        </div>

        <motion.div
          className="auth-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            to="/login/student"
            className="auth-btn"
            style={{
              display: 'block',
              textDecoration: 'none',
              marginBottom: '16px',
              opacity: isLoginDisabled ? 0.6 : 1,
              pointerEvents: isLoginDisabled ? 'none' : 'auto',
              cursor: isLoginDisabled ? 'not-allowed' : 'pointer'
            }}
            onClick={blockLoginNavigation}
            aria-disabled={isLoginDisabled}
          >
            <span>{isLoginDisabled ? 'STUDENT LOGIN DISABLED' : 'STUDENT LOGIN'}</span>
          </Link>

          <Link
            to="/login/admin"
            className="auth-btn"
            style={{
              display: 'block',
              textDecoration: 'none',
              opacity: isLoginDisabled ? 0.6 : 1,
              pointerEvents: isLoginDisabled ? 'none' : 'auto',
              cursor: isLoginDisabled ? 'not-allowed' : 'pointer'
            }}
            onClick={blockLoginNavigation}
            aria-disabled={isLoginDisabled}
          >
            <span>{isLoginDisabled ? 'ADMIN LOGIN DISABLED' : 'ADMIN LOGIN'}</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LoginSelection
