/**
 * AnimatedSection.jsx
 * High-quality, photography-themed animation primitives using framer-motion.
 * Used across all pages for consistent cinematic feel.
 */
import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'

/* â”€â”€â”€ EASING CURVES â”€â”€â”€ */
export const ease = {
  out:    [0.16, 1, 0.3, 1],
  inOut:  [0.76, 0, 0.24, 1],
  spring: { type: 'spring', stiffness: 60, damping: 20 },
  snap:   { type: 'spring', stiffness: 400, damping: 40 },
}

/* â”€â”€â”€ VARIANTS â”€â”€â”€ */
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 48 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.9, ease: ease.out } },
}

export const fadeInVariants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
}

export const clipRevealVariants = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
  show:   { clipPath: 'inset(0 0% 0 0)',   opacity: 1, transition: { duration: 1.1, ease: ease.inOut } },
}

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.8, ease: ease.out } },
}

export const staggerContainer = (staggerChildren = 0.12, delayChildren = 0) => ({
  hidden: {},
  show:   { transition: { staggerChildren, delayChildren } },
})

/* â”€â”€â”€ FADE UP â”€â”€â”€ */
export function FadeUp({ children, delay = 0, className = '', once = true, ...props }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 48 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.9, ease: ease.out, delay } },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/* â”€â”€â”€ FADE LEFT â”€â”€â”€ */
export function FadeLeft({ children, delay = 0, className = '', once = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{
        hidden: { opacity: 0, x: -60 },
        show:   { opacity: 1, x: 0, transition: { duration: 0.9, ease: ease.out, delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* â”€â”€â”€ FADE RIGHT â”€â”€â”€ */
export function FadeRight({ children, delay = 0, className = '', once = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{
        hidden: { opacity: 0, x: 60 },
        show:   { opacity: 1, x: 0, transition: { duration: 0.9, ease: ease.out, delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* â”€â”€â”€ STAGGER CONTAINER â”€â”€â”€ */
export function StaggerContainer({ children, delay = 0, stagger = 0.12, className = '', once = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* â”€â”€â”€ STAGGER ITEM â”€â”€â”€ */
export function StaggerItem({ children, className = '', ...props }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 36 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: ease.out } },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/* â”€â”€â”€ CLIP REVEAL (text wipe) â”€â”€â”€ */
export function ClipReveal({ children, delay = 0, className = '', once = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount: 0.1 })
  return (
    <div ref={ref} style={{ overflow: 'hidden' }} className={className}>
      <motion.div
        initial={{ y: '110%' }}
        animate={inView ? { y: '0%' } : { y: '110%' }}
        transition={{ duration: 0.9, ease: ease.out, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/* â”€â”€â”€ PARALLAX IMAGE â”€â”€â”€ */
export function ParallaxImage({ src, alt, strength = 80, className = '', imgClass = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength])
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.15 }}
        className={`w-full h-full object-cover ${imgClass}`}
      />
    </div>
  )
}

/* â”€â”€â”€ MAGNETIC BUTTON â”€â”€â”€ */
export function MagneticButton({ children, className = '', strength = 0.35, ...props }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setPos({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={ease.spring}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/* â”€â”€â”€ SHUTTER PAGE TRANSITION â”€â”€â”€ */
export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {/* Shutter panels */}
      <motion.div
        className="fixed inset-0 z-[9999] pointer-events-none"
        style={{ background: '#1b1c19' }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: ease.inOut, delay: 0.05 }}
        style={{ transformOrigin: 'top', background: '#1b1c19' }}
      />
      {children}
    </motion.div>
  )
}

/* â”€â”€â”€ COUNTER ANIMATION â”€â”€â”€ */
export function AnimatedCounter({ target, suffix = '', duration = 2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const num = parseInt(target.replace(/\D/g, ''))
    let start = 0
    const step = num / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= num) { setCount(num); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return (
    <span ref={ref}>
      {count}{target.includes('+') ? '+' : target.includes('%') ? '%' : ''}
    </span>
  )
}

/* â”€â”€â”€ TYPEWRITER â”€â”€â”€ */
export function Typewriter({ text, delay = 0, speed = 60, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (!inView) return
    let i = 0
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) clearInterval(interval)
      }, speed)
      return () => clearInterval(interval)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [inView, text, delay, speed])

  return (
    <span ref={ref} className={`typewriter-cursor ${className}`}>{displayed}</span>
  )
}

/* â”€â”€â”€ HOVER TILT CARD â”€â”€â”€ */
export function TiltCard({ children, className = '', intensity = 8 }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * intensity
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -intensity
    setTilt({ x, y })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ rotateX: tilt.y, rotateY: tilt.x }}
      transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* â”€â”€â”€ SCROLL VELOCITY MARQUEE â”€â”€â”€ */
export function VelocityMarquee({ items, baseVelocity = -3, className = '' }) {
  const [x, setX] = useState(0)
  const animRef = useRef(null)
  const prevTime = useRef(null)

  useEffect(() => {
    const animate = (time) => {
      if (prevTime.current !== null) {
        const delta = (time - prevTime.current) / 1000
        setX(prev => {
          const next = prev + baseVelocity * delta * 60
          // Reset when moved half the track
          return next <= -50 ? 0 : next
        })
      }
      prevTime.current = time
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [baseVelocity])

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div style={{ x: `${x}%` }} className="inline-flex">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-block">{item}</span>
        ))}
      </motion.div>
    </div>
  )
}

/* â”€â”€â”€ IMAGE REVEAL (aperture wipe) â”€â”€â”€ */
export function ImageReveal({ src, alt, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-center"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: ease.out, delay }}
      />
      {/* Gold wipe overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: '#f5f3ee', transformOrigin: 'right' }}
        initial={{ scaleX: 1 }}
        animate={inView ? { scaleX: 0 } : {}}
        transition={{ duration: 0.9, ease: ease.inOut, delay: delay + 0.1 }}
      />
    </div>
  )
}

/* â”€â”€â”€ SCROLL PROGRESS BAR â”€â”€â”€ */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left pointer-events-none"
      style={{
        scaleX: scrollYProgress,
        willChange: 'transform',
        background: 'linear-gradient(90deg, #ffdea5, #e9c176, #775a19)',
      }}
    />
  )
}

/* â”€â”€â”€ FLOATING ELEMENT â”€â”€â”€ */
export function FloatElement({ children, amplitude = 12, duration = 4, className = '' }) {
  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* â”€â”€â”€ GOLD LINE DRAW â”€â”€â”€ */
export function GoldLineDraw({ width = 80, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ width: 0 }}
      animate={inView ? { width } : {}}
      transition={{ duration: 0.8, ease: ease.out, delay }}
      style={{ height: '1px', background: 'linear-gradient(90deg, #e9c176, #775a19)' }}
    />
  )
}


