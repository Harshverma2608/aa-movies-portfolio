import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  FadeUp, FadeLeft, FadeRight, StaggerContainer, StaggerItem,
  MagneticButton, ScrollProgressBar, AnimatedCounter,
  FloatElement, GoldLineDraw,
} from '../components/AnimatedSection'
import { IMG, useImages } from '../hooks/useMedia'

const E = [0.16, 1, 0.3, 1]

const stats = [
  { value:'250+',  label:'Weddings'         },
  { value:'12+',   label:'Years of Craft'   },
  { value:'1200+', label:'Sessions'         },
  { value:'98%',   label:'Happy Clients'    },
]

const services = [
  {
    tag:'Weddings', icon:'favorite',
    title:'Wedding Coverage',
    desc:'Full-day editorial documentation — from the morning rituals to the last dance. Every stolen glance, preserved.',
    img: IMG.img2,
  },
  {
    tag:'Pre-Wedding', icon:'camera',
    title:'Pre-Wedding Shoots',
    desc:'Intimate sessions in locations that carry meaning. Two people, natural light, and a story worth telling.',
    img: IMG.img8,
  },
  {
    tag:'Portraits', icon:'portrait',
    title:'Portrait Sessions',
    desc:'Timeless individual and family portraits crafted with natural light and architectural spaces.',
    img: IMG.img9,
  },
  {
    tag:'Events', icon:'celebration',
    title:'Event Coverage',
    desc:'Birthdays, corporate events, and celebrations — documented with the same cinematic care as a wedding.',
    img: IMG.img6,
  },
]

const portfolio = [
  { src: IMG.img4,  cat:'Weddings',    title:'The Grand Ceremony',   span:'col-span-2 row-span-2' },
  { src: IMG.img7,  cat:'Pre-Wedding', title:'Before Forever',        span:'col-span-1' },
  { src: IMG.img8,  cat:'Events',      title:'Grand Celebrations',    span:'col-span-1' },
  { src: IMG.img9,  cat:'Portraits',   title:'The Heritage Series',   span:'col-span-1' },
  { src: IMG.img3,  cat:'Weddings',    title:'Sacred Vows',           span:'col-span-1' },
]

/* ─── CURSOR ─── */
function Cursor() {
  const dot = useRef(null), ring = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    let rx = 0, ry = 0
    const move = ({ clientX: x, clientY: y }) => {
      if (dot.current)  { dot.current.style.left  = x - 4  + 'px'; dot.current.style.top  = y - 4  + 'px' }
      rx += (x - rx) * 0.12; ry += (y - ry) * 0.12
      if (ring.current) { ring.current.style.left = rx - 18 + 'px'; ring.current.style.top = ry - 18 + 'px' }
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <>
      <div ref={dot}  className="cursor-dot  hidden lg:block" />
      <div ref={ring} className="cursor-ring hidden lg:block" />
    </>
  )
}

export default function Home() {
  const allImages = useImages()
  const [loaded,    setLoaded]    = useState(false)
  const [slideIdx,  setSlideIdx]  = useState(0)

  const slides = allImages.filter(i => !i.name.includes('logo')).slice(0, 5).map(i => i.url)

  useEffect(() => {
    const t = setInterval(() => setSlideIdx(i => (i + 1) % slides.length), 4000)
    return () => clearInterval(t)
  }, [slides.length])

  return (
    <div className="bg-[#fbf9f4] text-[#1b1c19] lg:cursor-none">
      <Cursor />
      <ScrollProgressBar />
      <Navbar />

      {/* ══════════════════════════════════════
          HERO — auto-sliding images
      ══════════════════════════════════════ */}
      <section className="relative w-full flex items-center justify-center overflow-hidden" style={{ height: '100vh', minHeight: '100svh' }}>
        {/* Background slides */}
        <div className="absolute inset-0 z-0" style={{ height: '100%' }}>
          <AnimatePresence mode="sync">
            <motion.img
              key={slideIdx}
              src={slides[slideIdx]}
              alt="A&A Movies"
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ height: '100%', width: '100%' }}
              loading={slideIdx === 0 ? 'eager' : 'lazy'}
              fetchPriority={slideIdx === 0 ? 'high' : 'low'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              onLoad={() => setLoaded(true)}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/65 z-10" />
        </div>

        {/* Slide indicator dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setSlideIdx(i)}
              style={{
                width: i === slideIdx ? '28px' : '7px', height: '7px',
                borderRadius: '4px', padding: 0, border: 'none', cursor: 'pointer',
                background: i === slideIdx ? '#e9c176' : 'rgba(255,255,255,0.35)',
                transition: 'all 0.4s ease',
              }}
            />
          ))}
        </div>

        {/* Hero text */}
        <motion.div
          className="relative z-20 text-center text-[#fbf9f4] px-6 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}>

          <motion.p
            className="font-oswald text-[10px] tracking-[0.55em] uppercase mb-4"
            style={{ color: '#e9c176' }}
            initial={{ opacity: 0, y: 16 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: E }}>
            A&amp;A Movies Studio
          </motion.p>

          <div className="overflow-hidden mb-4">
            <motion.h1
              className="font-[Noto_Serif] font-light tracking-tight leading-[1.1]"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)' }}
              initial={{ y: '110%' }}
              animate={loaded ? { y: '0%' } : {}}
              transition={{ duration: 1, delay: 0.3, ease: E }}>
              Capturing the <br />
              <span className="font-script text-gold-shimmer" style={{ fontSize: '1.15em' }}>
                Soul of Silence
              </span>
            </motion.h1>
          </div>

          <motion.p
            className="text-sm tracking-wide max-w-md mx-auto mb-8"
            style={{ opacity: 0.8 }}
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 0.8, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.55, ease: E }}>
            Traditional portraiture and cinematic event coverage for life's most sacred transitions.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7, ease: E }}>
            <MagneticButton>
              <Link to="/contact">
                <motion.button
                  className="gold-gradient text-[#261900] px-8 py-3 text-xs tracking-[0.25em] uppercase font-bold rounded-sm"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                  Book a Session
                </motion.button>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/gallery">
                <motion.button
                  className="text-[#fbf9f4] px-8 py-3 text-xs tracking-[0.25em] uppercase rounded-sm"
                  style={{ border: '1px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)' }}
                  whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                  View Gallery
                </motion.button>
              </Link>
            </MagneticButton>
          </motion.div>

          <FloatElement amplitude={8} duration={3.5} className="mt-10">
            <span className="material-symbols-outlined text-xl" style={{ opacity: 0.4 }}>
              keyboard_double_arrow_down
            </span>
          </FloatElement>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          MARQUEE TICKER
      ══════════════════════════════════════ */}
      <div className="bg-[#1b1c19] py-3 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
          {['Weddings','·','Portraits','·','Pre-Wedding','·','Events','·','Albums','·','Films','·',
            'Weddings','·','Portraits','·','Pre-Wedding','·','Events','·','Albums','·','Films','·'].map((w, i) => (
            <span key={i}
              className="inline-block mx-5 font-oswald text-[11px] tracking-[0.3em] uppercase flex-shrink-0"
              style={{ color: w === '·' ? '#e9c176' : 'rgba(251,249,244,0.4)' }}>
              {w}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ══════════════════════════════════════
          STATS
      ══════════════════════════════════════ */}
      <section className="py-16 sm:py-20 px-6 sm:px-12 bg-[#f5f3ee]">
        <StaggerContainer
          className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          stagger={0.12}>
          {stats.map((s, i) => (
            <StaggerItem key={i} className="text-center">
              <p className="font-geist font-light text-gold-shimmer mb-1"
                style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
                <AnimatedCounter target={s.value} duration={2} />
              </p>
              <GoldLineDraw width={32} delay={0.2 + i * 0.08} />
              <p className="font-oswald text-[10px] tracking-[0.3em] uppercase text-[#7f7667] mt-2">{s.label}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ══════════════════════════════════════
          ABOUT / PHILOSOPHY
      ══════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 bg-[#fbf9f4]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Image — clean, no floating elements */}
          <FadeLeft>
            <div className="relative w-full">
              {/* Main image */}
              <div className="aspect-[4/3] overflow-hidden bg-[#f5f3ee]">
                <img src={IMG.img2} alt="A&A Movies Studio"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105" />
              </div>
              {/* Accent image — hidden on mobile to prevent overflow */}
              <div className="absolute bottom-3 right-3 w-20 sm:w-24 border-2 border-[#fbf9f4] overflow-hidden shadow-lg hidden sm:block">
                <div className="aspect-[4/3]">
                  <img src={IMG.img7} alt="" loading="lazy"
                    className="w-full h-full object-cover object-center" />
                </div>
              </div>
            </div>
          </FadeLeft>

          {/* Text */}
          <FadeRight delay={0.1}>
            <p className="font-oswald text-[10px] tracking-[0.4em] uppercase text-[#775a19] mb-4">Our Philosophy</p>
            <h2 className="font-unna font-light leading-tight mb-5"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}>
              Preserving the ephemeral through the lens of{' '}
              <span className="italic text-[#775a19]">eternity</span>.
            </h2>
            <p className="text-[#4e4639] leading-relaxed text-sm sm:text-base mb-4 max-w-lg">
              At A&amp;A Movies, we believe photography is an act of preservation. We focus on the raw
              emotion of a wedding day, the quiet wonder of a new life, and the heritage found in
              traditional portraiture.
            </p>
            <p className="text-[#4e4639] leading-relaxed text-sm sm:text-base mb-7 max-w-lg">
              Our approach is observational yet intentional — every frame a deliberate piece of art.
            </p>
            <motion.div whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Link to="/about"
                className="inline-block font-oswald text-xs tracking-widest uppercase pb-1 hover:text-[#775a19] transition-colors"
                style={{ borderBottom: '1px solid #1b1c19', textDecoration: 'none', color: '#1b1c19' }}>
                Discover the Studio
              </Link>
            </motion.div>
          </FadeRight>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICES — 4 cards, clean grid
      ══════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 bg-[#f5f3ee]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="font-oswald text-[10px] tracking-[0.4em] uppercase text-[#775a19] mb-2">What We Do</p>
              <h2 className="font-unna font-light" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}>
                Our Services
              </h2>
            </div>
            <Link to="/packages"
              className="font-oswald text-[10px] tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity self-start sm:self-auto"
              style={{ textDecoration: 'none', color: '#1b1c19' }}>
              View Packages →
            </Link>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.08}>
            {services.map((svc, i) => (
              <StaggerItem key={i}>
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                  <motion.div
                    className="group bg-white overflow-hidden"
                    whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(27,28,25,0.08)' }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={svc.img} alt={svc.title} loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-4 sm:p-5">
                      <p className="font-oswald text-[9px] tracking-[0.25em] uppercase text-[#775a19] mb-2">{svc.tag}</p>
                      <h3 className="font-unna text-base sm:text-lg leading-snug mb-2">{svc.title}</h3>
                      <p className="text-[#4e4639] text-xs leading-relaxed">{svc.desc}</p>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PORTFOLIO GRID
      ══════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 bg-[#fbf9f4]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-oswald text-[10px] tracking-[0.4em] uppercase text-[#775a19] mb-2">The Portfolio</p>
              <h2 className="font-unna font-light" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}>
                Featured Narratives
              </h2>
            </div>
            <Link to="/gallery"
              className="font-oswald text-[10px] tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity self-start sm:self-auto"
              style={{ textDecoration: 'none', color: '#1b1c19' }}>
              View Full Archive →
            </Link>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3" stagger={0.08} delay={0.1}>
            {portfolio.map((item, i) => (
              <StaggerItem key={i} className={i === 0 ? 'col-span-2 md:col-span-2 row-span-1 md:row-span-2' : ''}>
                <Link to="/gallery" style={{ textDecoration: 'none' }}>
                  <motion.div
                    className="group relative overflow-hidden"
                    style={{ aspectRatio: i === 0 ? '16/9' : '4/3' }}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.4 }}>
                    <img src={item.src} alt={item.title} loading={i < 2 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3 sm:p-4"
                      initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.35 }}>
                      <div className="text-white">
                        <p className="font-oswald text-[9px] tracking-widest uppercase mb-0.5" style={{ color: '#e9c176' }}>{item.cat}</p>
                        <p className="font-unna text-sm sm:text-base">{item.title}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ══════════════════════════════════════
          DARK CRAFT BAND
      ══════════════════════════════════════ */}
      <section className="py-16 sm:py-20 px-6 sm:px-12 bg-[#1b1c19] relative overflow-hidden">
        {/* Background aperture rings */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          {[100, 160, 220, 280].map((size, i) => (
            <motion.div key={i} className="absolute rounded-full"
              style={{ width: size, height: size, border: '1px solid #e9c176', top: '50%', left: `${10 + i * 22}%`, transform: 'translate(-50%,-50%)' }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }} />
          ))}
        </div>
        <FadeUp className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            className="aperture-ring mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}>
            <span className="material-symbols-outlined text-3xl glow-icon"
              style={{ color: '#e9c176', fontVariationSettings: "'FILL' 0, 'wght' 100" }}>photo_camera</span>
          </motion.div>
          <p className="font-oswald text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#e9c176' }}>The Craft</p>
          <h3 className="font-unna font-light text-[#fbf9f4] mb-5"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}>
            Every frame is a <span className="italic" style={{ color: '#e9c176' }}>deliberate decision</span>.
          </h3>
          <p className="text-sm leading-relaxed max-w-xl mx-auto" style={{ color: '#d1c5b4' }}>
            Medium-format film alongside digital capture — blending chemical depth with modern precision.
            The result is imagery that feels both timeless and alive.
          </p>
        </FadeUp>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIAL
      ══════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 bg-[#fbf9f4]">
        <FadeUp className="max-w-2xl mx-auto text-center">
          <motion.span
            className="material-symbols-outlined text-3xl mb-5 block"
            style={{ color: '#775a19', fontVariationSettings: "'FILL' 1" }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
            format_quote
          </motion.span>
          <p className="font-script text-[#1b1c19] mb-6"
            style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', lineHeight: 1.65 }}>
            "A&amp;A Movies captured our wedding with a sensitivity I didn't think possible."
          </p>
          <GoldLineDraw width={40} delay={0.2} />
          <p className="font-oswald text-xs tracking-[0.3em] uppercase mt-3 text-[#1b1c19]">Priya &amp; Rahul Sharma</p>
          <p className="text-xs text-[#7f7667] mt-1">Le Meridien, Jaipur</p>
        </FadeUp>
      </section>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 text-center bg-[#f5f3ee] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <motion.svg width="400" height="400" viewBox="0 0 400 400"
            animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}>
            {[170, 130, 90, 50].map((r, i) => (
              <circle key={i} cx="200" cy="200" r={r} stroke="#775a19" strokeWidth="1" fill="none"
                strokeDasharray={i % 2 === 0 ? 'none' : '4 8'} />
            ))}
          </motion.svg>
        </div>
        <FadeUp className="relative z-10 max-w-xl mx-auto">
          <p className="font-oswald text-[10px] tracking-[0.5em] uppercase text-[#775a19] mb-4">Begin Your Story</p>
          <h2 className="font-unna font-light mb-8"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}>
            Let's craft your <span className="italic text-[#775a19]">legacy</span> together.
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <MagneticButton>
              <Link to="/contact">
                <motion.button
                  className="gold-gradient text-[#261900] px-10 py-3.5 text-xs tracking-[0.3em] uppercase font-bold rounded-sm"
                  style={{ boxShadow: '0 12px 24px rgba(119,90,25,0.18)' }}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                  Book a Session
                </motion.button>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/gallery">
                <motion.button
                  className="text-[#1b1c19] px-10 py-3.5 text-xs tracking-widest uppercase"
                  style={{ borderBottom: '1px solid #1b1c19' }}
                  whileHover={{ color: '#775a19', borderBottomColor: '#775a19', x: 4 }}
                  transition={{ type: 'spring', stiffness: 300 }}>
                  View Gallery
                </motion.button>
              </Link>
            </MagneticButton>
          </div>
        </FadeUp>
      </section>

      <Footer />
    </div>
  )
}
