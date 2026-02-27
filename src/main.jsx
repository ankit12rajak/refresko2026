import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ComingSoonPage from './pages/ComingSoonPage.jsx'
import Admin from './pages/Admin/Admin.jsx'
import SuperAdmin from './pages/SuperAdmin/SuperAdmin.jsx'
import ProfileSetup from './pages/ProfileSetup.jsx'
import SKFDashboard from './pages/SKFDashboard.jsx'
import PaymentGateway from './pages/PaymentGateway.jsx'

const MAINTENANCE_MODE = true

if (MAINTENANCE_MODE) {
  document.body.classList.add('system-cursor')
} else {
  document.body.classList.remove('system-cursor')
}

function MaintenancePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#050507',
        color: '#f5f7ff',
        textAlign: 'center',
        padding: '24px',
      }}
    >
      <div style={{ maxWidth: '640px' }}>
        <h1 style={{ marginBottom: '12px', fontSize: '2rem' }}>Refresko Cloud Server is facing Technical issues</h1>
        <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
          We&rsquo;re performing urgent updates right now. Please check back shortly.
        </p>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {MAINTENANCE_MODE ? (
        <Routes>
          <Route path="*" element={<MaintenancePage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/student" element={<Login />} />
          <Route path="/login/admin" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/super-admin" element={<SuperAdmin />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/dashboard" element={<SKFDashboard />} />
          <Route path="/payment-gateway" element={<PaymentGateway />} />
          <Route
            path="/events"
            element={
              <ComingSoonPage
                title="Events"
                subtitle="Next-level arenas, curated matchups, and battles engineered for maximum adrenaline."
                launchLine="MARCH 2026"
              />
            }
          />
          <Route
            path="/gallery"
            element={
              <ComingSoonPage
                title="Gallery"
                subtitle="A cinematic archive of Refresko moments, crafted for the boldest minds."
                launchLine="MARCH 2026"
              />
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  </StrictMode>,
)
