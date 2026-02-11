import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import './Navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const logoRef = useRef(null)
  const navLinks = ['HOME', 'EVENTS', 'GALLERY']

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
