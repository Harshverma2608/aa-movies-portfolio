import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { IMG } from '../hooks/useMedia'

const links = [
  { to: '/',          label: 'Home'     },
  { to: '/gallery',   label: 'Gallery'  },
  { to: '/offerings', label: 'Services' },
  { to: '/packages',  label: 'Packages' },
  { to: '/albums',    label: 'Albums'   },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [heroLight, setHeroLight] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const darkHeroPages = ['/', '/gallery', '/offerings', '/about', '/contact']
  const onDarkHero = darkHeroPages.includes(location.pathname)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      setHeroLight(y < window.innerHeight * 0.75)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const isTransparent = onDarkHero && heroLight && !scrolled
  const textColor = isTransparent ? '#fbf9f4' : '#1b1c19'
  const goldColor = isTransparent ? '#e9c176' : '#775a19'

  return (
    <>
      <nav
        className="fixed top-0 w-full z-50 transition-all duration-500"
        style={{
          background: isTransparent
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)'
            : 'rgba(251,249,244,0.97)',
          backdropFilter: isTransparent ? 'none' : 'blur(20px)',
          boxShadow: scrolled && !isTransparent ? '0 1px 0 rgba(209,197,180,0.5)' : 'none',
          paddingTop: scrolled ? '10px' : '16px',
          paddingBottom: scrolled ? '10px' : '16px',
          paddingLeft: 'clamp(16px, 4vw, 48px)',
          paddingRight: 'clamp(16px, 4vw, 48px)',
        }}
      >
        <div className="flex items-center justify-between w-full">

          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-3 flex-shrink-0" style={{ textDecoration: 'none' }}>
            <div className="relative flex-shrink-0" style={{ width: scrolled ? '42px' : '52px', height: scrolled ? '42px' : '52px', transition: 'all 0.4s ease' }}>
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: `1px solid ${isTransparent ? 'rgba(233,193,118,0.5)' : 'rgba(119,90,25,0.3)'}`,
                  animation: 'lensFocus 8s ease-in-out infinite',
                  transition: 'border-color 0.4s ease',
                }}
              />
              <img
                src={IMG.logo}
                alt="A&A Movies"
                style={{
                  position: 'absolute',
                  inset: '4px',
                  width: 'calc(100% - 8px)',
                  height: 'calc(100% - 8px)',
                  objectFit: 'contain',
                  display: 'block',
                  filter: isTransparent ? 'brightness(0) invert(1)' : 'none',
                  transition: 'all 0.4s ease',
                }}
              />
            </div>
            <div>
              <p style={{ fontFamily: 'Noto Serif, serif', fontSize: scrolled ? '13px' : '15px', letterSpacing: '0.22em', textTransform: 'uppercase', color: textColor, transition: 'all 0.4s ease', lineHeight: 1, fontWeight: 300 }}>
                A&amp;A Movies
              </p>
              <p style={{ fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: goldColor, transition: 'color 0.4s ease', marginTop: '4px', lineHeight: 1 }}>
                Event Photography
              </p>
            </div>
          </NavLink>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                style={({ isActive }) => ({
                  position: 'relative',
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontFamily: 'Oswald, sans-serif',
                  color: isActive ? goldColor : textColor,
                  opacity: isActive ? 1 : 0.75,
                  textDecoration: 'none',
                  transition: 'color 0.4s ease, opacity 0.3s ease',
                  paddingBottom: '4px',
                })}
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      height: '1px',
                      width: isActive ? '100%' : '0%',
                      background: goldColor,
                      transition: 'width 0.4s ease',
                      display: 'block',
                    }} />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* CTA + HAMBURGER */}
          <div className="flex items-center gap-4">
            <NavLink to="/contact" className="hidden md:block" style={{ textDecoration: 'none' }}>
              <button
                className="relative overflow-hidden text-xs tracking-[0.2em] uppercase font-semibold px-7 py-3 rounded-sm transition-all duration-500"
                style={{
                  background: isTransparent ? 'rgba(255,255,255,0.12)' : 'linear-gradient(135deg,#ffdea5,#e9c176)',
                  color: isTransparent ? '#fbf9f4' : '#261900',
                  border: isTransparent ? '1px solid rgba(255,255,255,0.25)' : 'none',
                  backdropFilter: isTransparent ? 'blur(8px)' : 'none',
                }}
                onMouseEnter={e => { if (!isTransparent) e.currentTarget.style.background = 'linear-gradient(135deg,#e9c176,#c5a129)' }}
                onMouseLeave={e => { if (!isTransparent) e.currentTarget.style.background = 'linear-gradient(135deg,#ffdea5,#e9c176)' }}
              >
                Book a Session
              </button>
            </NavLink>

            {/* Hamburger */}
            <button className="lg:hidden p-2 flex flex-col gap-1.5" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block',
                  height: '1px',
                  width: '24px',
                  background: textColor,
                  transition: 'all 0.3s ease',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translate(4px,4px)'
                    : i === 2 ? 'rotate(-45deg) translate(4px,-4px)'
                    : 'scaleX(0)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 40,
        background: 'rgba(251,249,244,0.98)',
        backdropFilter: 'blur(20px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '40px',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {links.map(({ to, label }) => (
          <NavLink key={to} to={to} end={to === '/'} style={({ isActive }) => ({
            fontFamily: 'Noto Serif, serif', fontSize: '28px', fontWeight: 300,
            letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none',
            color: isActive ? '#775a19' : '#1b1c19',
          })}>
            {label}
          </NavLink>
        ))}
        <NavLink to="/contact" style={{ textDecoration: 'none' }}>
          <button className="gold-gradient text-[#261900] px-10 py-4 text-xs tracking-[0.2em] uppercase font-bold rounded-sm mt-4">
            Book a Session
          </button>
        </NavLink>
      </div>
    </>
  )
}

