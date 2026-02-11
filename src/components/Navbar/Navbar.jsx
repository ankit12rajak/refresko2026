import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import './Navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const logoRef = useRef(null)
  const navLinks = ['HOME', 'EVENTS', 'WORKSHOPS', 'CA PROGRAM', 'GALLERY']

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Neon flicker effect on 2026
  useEffect(() => {
    const flickerAnimation = () => {
      const year = logoRef.current?.querySelector('.logo-year')
      if (year) {
        gsap.to(year, {
          opacity: 0.3,
          duration: 0.05,
          yoyo: true,
          repeat: 3,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.to(year, { opacity: 1, duration: 0.1 })
          }
        })
      }
    }

    const interval = setInterval(flickerAnimation, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="navbar-container">
        <div ref={logoRef} className="logo">
          <span className="logo-main">REFRESKO</span>
          <span className="logo-year">2026</span>
        </div>

        <ul className="nav-links">
          {navLinks.map((link, index) => (
            <motion.li
              key={link}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="nav-link interactive">
                {link}
                <span className="link-underline" />
              </a>
            </motion.li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="cart-btn interactive">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" />
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" />
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" />
            </svg>
          </button>
          <motion.button
            className="login-btn interactive"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            LOGIN
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
