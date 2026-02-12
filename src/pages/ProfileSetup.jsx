import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './ProfileSetup.css'

const ProfileSetup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    department: '',
    year: '',
    phone: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    document.body.classList.add('system-cursor')
    
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    // Check if profile is already completed
    const profileCompleted = localStorage.getItem('profileCompleted')
    if (profileCompleted === 'true') {
      navigate('/dashboard')
    }

    return () => {
      document.body.classList.remove('system-cursor')
    }
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required'
    } else if (!/^SKF\d{7}$/.test(formData.studentId)) {
      newErrors.studentId = 'Student ID must be in format: SKF followed by 7 digits (e.g., SKF2024001)'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@skf\.edu$/.test(formData.email)) {
      newErrors.email = 'Email must be a valid SKF email (ending with @skf.edu)'
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required'
    }

    if (!formData.year) {
      newErrors.year = 'Year is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[+]?[\d\s-]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Save profile data to localStorage
      localStorage.setItem('studentProfile', JSON.stringify(formData))
      localStorage.setItem('profileCompleted', 'true')
      
      // Redirect to dashboard
      navigate('/dashboard')
    }
  }

  return (
    <div className="profile-setup-page">
      <div className="hex-grid-overlay" />

      <motion.div
        className="profile-setup-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="profile-header">
          <motion.div
            className="profile-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="setup-icon">👤</div>
          </motion.div>

          <motion.h1
            className="profile-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            COMPLETE YOUR PROFILE
          </motion.h1>

          <motion.p
            className="profile-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Please fill in your details to access your SKF dashboard
          </motion.p>

          <motion.div
            className="progress-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="progress-step active">
              <span className="step-number">1</span>
              <span className="step-label">Login</span>
            </div>
            <div className="progress-line active"></div>
            <div className="progress-step active">
              <span className="step-number">2</span>
              <span className="step-label">Profile</span>
            </div>
            <div className="progress-line"></div>
            <div className="progress-step">
              <span className="step-number">3</span>
              <span className="step-label">Dashboard</span>
            </div>
          </motion.div>
        </div>

        <motion.form
          className="profile-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`form-input ${errors.name ? 'error' : ''}`}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="studentId">Student ID / Roll No *</label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="SKF2024001"
                className={`form-input ${errors.studentId ? 'error' : ''}`}
              />
              {errors.studentId && <span className="error-message">{errors.studentId}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">SKF Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.name@skf.edu"
                className={`form-input ${errors.email ? 'error' : ''}`}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className={`form-input ${errors.phone ? 'error' : ''}`}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="department">Department *</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`form-input ${errors.department ? 'error' : ''}`}
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics and Communication">Electronics and Communication</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="MBA">MBA</option>
                <option value="MCA">MCA</option>
                <option value="Other">Other</option>
              </select>
              {errors.department && <span className="error-message">{errors.department}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="year">Year *</label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className={`form-input ${errors.year ? 'error' : ''}`}
              >
                <option value="">Select Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Final Year">Final Year</option>
              </select>
              {errors.year && <span className="error-message">{errors.year}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              <span>SAVE & CONTINUE TO DASHBOARD</span>
            </button>
          </div>
        </motion.form>

        <motion.div
          className="profile-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <p className="footer-note">
            All fields marked with * are required
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ProfileSetup
