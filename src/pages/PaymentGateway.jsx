import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './PaymentGateway.css'

const PaymentGateway = () => {
  const navigate = useNavigate()
  const [foodPreference, setFoodPreference] = useState('')
  const [studentProfile, setStudentProfile] = useState(null)
  const [paymentStatus, setPaymentStatus] = useState('pending') // pending, processing, success
  const [transactionId, setTransactionId] = useState('')

  useEffect(() => {
    document.body.classList.add('system-cursor')

    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    const profileCompleted = localStorage.getItem('profileCompleted')
    
    if (!isAuthenticated || profileCompleted !== 'true') {
      navigate('/login')
      return
    }

    // Get food preference
    const savedFoodPreference = localStorage.getItem('foodPreference')
    if (!savedFoodPreference) {
      navigate('/dashboard')
      return
    }
    setFoodPreference(savedFoodPreference)

    // Get student profile
    const savedProfile = localStorage.getItem('studentProfile')
    if (savedProfile) {
      setStudentProfile(JSON.parse(savedProfile))
    }

    return () => {
      document.body.classList.remove('system-cursor')
    }
  }, [navigate])

  const handleConfirmPayment = () => {
    setPaymentStatus('processing')
    
    // Simulate payment processing
    setTimeout(() => {
      const txnId = `TXN${Date.now()}`
      setTransactionId(txnId)
      setPaymentStatus('success')
      
      // Update localStorage with payment info
      localStorage.setItem('paymentCompleted', 'true')
      localStorage.setItem('transactionId', txnId)
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigate('/dashboard')
      }, 3000)
    }, 2000)
  }

  if (!studentProfile) {
    return null
  }

  return (
    <div className="payment-page">
      <div className="hex-grid-overlay" />

      <Link to="/dashboard" className="back-dashboard">
        <span>← Back to Dashboard</span>
      </Link>

      <div className="payment-container">
        {paymentStatus === 'pending' && (
          <motion.div
            className="payment-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="payment-header">
              <motion.div
                className="payment-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                💳
              </motion.div>
              <h1 className="payment-title">PAYMENT GATEWAY</h1>
              <p className="payment-subtitle">Refresko 2026 Registration Payment</p>
            </div>

            <div className="payment-details-card">
              <h2>Order Summary</h2>
              <div className="order-details">
                <div className="detail-item">
                  <span className="item-label">Student Name</span>
                  <span className="item-value">{studentProfile.name}</span>
                </div>
                <div className="detail-item">
                  <span className="item-label">Student ID</span>
                  <span className="item-value">{studentProfile.studentId}</span>
                </div>
                <div className="detail-item">
                  <span className="item-label">Email</span>
                  <span className="item-value">{studentProfile.email}</span>
                </div>
                <div className="detail-item">
                  <span className="item-label">Food Preference</span>
                  <span className="item-value food-badge">
                    {foodPreference === 'VEG' ? '🥗 Vegetarian' : '🍗 Non-Vegetarian'}
                  </span>
                </div>
              </div>

              <div className="payment-breakdown">
                <div className="breakdown-item">
                  <span>Base Registration</span>
                  <span>₹300</span>
                </div>
                <div className="breakdown-item">
                  <span>Event Access Pass</span>
                  <span>₹150</span>
                </div>
                <div className="breakdown-item">
                  <span>Merchandise Voucher</span>
                  <span>₹50</span>
                </div>
                <div className="breakdown-total">
                  <span>Total Amount</span>
                  <span className="total-amount">₹500</span>
                </div>
              </div>
            </div>

            <div className="qr-payment-card">
              <h2>Scan QR Code to Pay</h2>
              <p className="qr-instructions">Use any UPI app to scan and pay</p>
              
              <div className="qr-code-container">
                <div className="qr-code-wrapper">
                  {/* QR Code SVG - Placeholder */}
                  <svg viewBox="0 0 200 200" className="payment-qr">
                    <rect x="0" y="0" width="200" height="200" fill="white"/>
                    {/* QR Pattern Simulation */}
                    <rect x="20" y="20" width="40" height="40" fill="black"/>
                    <rect x="140" y="20" width="40" height="40" fill="black"/>
                    <rect x="20" y="140" width="40" height="40" fill="black"/>
                    <rect x="70" y="20" width="10" height="10" fill="black"/>
                    <rect x="90" y="20" width="10" height="10" fill="black"/>
                    <rect x="110" y="20" width="10" height="10" fill="black"/>
                    <rect x="70" y="40" width="10" height="10" fill="black"/>
                    <rect x="100" y="40" width="10" height="10" fill="black"/>
                    <rect x="70" y="70" width="10" height="10" fill="black"/>
                    <rect x="90" y="70" width="10" height="10" fill="black"/>
                    <rect x="110" y="70" width="10" height="10" fill="black"/>
                    <rect x="130" y="70" width="10" height="10" fill="black"/>
                    <rect x="70" y="90" width="10" height="10" fill="black"/>
                    <rect x="100" y="90" width="10" height="10" fill="black"/>
                    <rect x="120" y="90" width="10" height="10" fill="black"/>
                    <rect x="70" y="110" width="10" height="10" fill="black"/>
                    <rect x="90" y="110" width="10" height="10" fill="black"/>
                    <rect x="110" y="110" width="10" height="10" fill="black"/>
                    <rect x="140" y="110" width="10" height="10" fill="black"/>
                    <rect x="160" y="90" width="10" height="10" fill="black"/>
                    <rect x="150" y="130" width="10" height="10" fill="black"/>
                    <rect x="170" y="140" width="10" height="10" fill="black"/>
                    <rect x="80" y="140" width="10" height="10" fill="black"/>
                    <rect x="100" y="150" width="10" height="10" fill="black"/>
                    <rect x="120" y="140" width="10" height="10" fill="black"/>
                    <rect x="90" y="170" width="10" height="10" fill="black"/>
                    <rect x="110" y="170" width="10" height="10" fill="black"/>
                    <rect x="130" y="170" width="10" height="10" fill="black"/>
                  </svg>
                  <div className="qr-glow-effect"></div>
                </div>
                
                <div className="payment-info">
                  <p className="upi-id">UPI ID: <span>refresko@upi</span></p>
                  <p className="amount-display">Amount: <span>₹500</span></p>
                </div>
              </div>

              <div className="payment-actions">
                <button className="payment-confirm-btn" onClick={handleConfirmPayment}>
                  <span>I Have Made the Payment</span>
                </button>
                <p className="payment-note">
                  Click above after completing the payment transaction
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {paymentStatus === 'processing' && (
          <motion.div
            className="payment-processing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="processing-animation">
              <div className="spinner"></div>
            </div>
            <h2>Processing Payment...</h2>
            <p>Please wait while we verify your transaction</p>
          </motion.div>
        )}

        {paymentStatus === 'success' && (
          <motion.div
            className="payment-success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="success-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              ✓
            </motion.div>
            <h2>Payment Successful!</h2>
            <p className="success-message">
              Your registration payment has been received
            </p>
            <div className="txn-details">
              <span>Transaction ID:</span>
              <span className="txn-id">{transactionId}</span>
            </div>
            <p className="redirect-message">
              Redirecting to dashboard...
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default PaymentGateway
