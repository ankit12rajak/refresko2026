import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Performers.css'

const performers = [
  {
    id: 1,
    name: 'ARIJIT SINGH',
    role: 'Playback Singer',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'
  },
  {
    id: 2,
    name: 'DJ NUCLEYA',
    role: 'Electronic Artist',
    image: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400'
  },
  {
    id: 3,
    name: 'ZAKIR KHAN',
    role: 'Stand-up Comedian',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  },
  {
    id: 4,
    name: 'SUNIDHI CHAUHAN',
    role: 'Playback Singer',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400'
  },
  {
    id: 5,
    name: 'AMIT TRIVEDI',
    role: 'Music Composer',
    image: 'https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=400'
  }
]

const Performers = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="performers" ref={sectionRef} className="performers">
      <div className="performers-header">
        <motion.span
          className="performers-label"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          PAST
        </motion.span>
        <motion.h2
          className="performers-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          PERFORMERS
        </motion.h2>
      </div>

      <div className="performers-track-wrapper">
        <div className="dotted-path">
          <svg viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path
              d="M0,100 Q300,20 600,100 T1200,100"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
              strokeDasharray="8,8"
              fill="none"
            />
          </svg>
        </div>

        <div className="performers-scroll">
          <div className="performers-grid">
            {performers.map((performer, index) => (
              <motion.div
                key={performer.id}
                className="performer-card interactive"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="performer-image-wrapper">
                  <img
                    src={performer.image}
                    alt={performer.name}
                    className="performer-image"
                  />
                  <div className="performer-overlay">
                    <div className="performer-info">
                      <h3 className="performer-name">{performer.name}</h3>
                      <p className="performer-role">{performer.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="performers-indicator">
        <span className="indicator-text">COGNIZANCE 2026</span>
      </div>
    </section>
  )
}

export default Performers
