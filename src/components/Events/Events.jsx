import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Events.css'

const Events = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="events" ref={sectionRef} className="events" data-particle-shape="3">
      <motion.h2
        className="section-title events-title"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        EVENTS
      </motion.h2>

      <div className="events-container">
        {/* Coming Soon Message */}
        <motion.div
          className="coming-soon-message"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            textAlign: 'center',
            padding: '80px 40px',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #ff0040 0%, #ff4d6a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}
          >
            Coming Soon
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '600px',
              lineHeight: '1.6'
            }}
          >
            Exciting events and competitions are on the way! Stay tuned for updates.
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="view-all-events"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <button className="btn-outline interactive">
          VIEW ALL EVENTS
          <span className="btn-arrow">→</span>
        </button>
      </motion.div>
    </section>
  )
}

export default Events
