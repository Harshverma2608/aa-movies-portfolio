import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'Gallery', to: '/gallery' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const socials = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'photo_camera' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'thumb_up' },
  { label: 'YouTube', href: `https://www.youtube.com/channel/UCN560mREywfAGih3Jhycwrg`, icon: 'play_circle' },
]

export default function Footer() {
  return (
    <footer className="bg-[#1b1c19] text-[#fbf9f4] pt-14 sm:pt-20 pb-8 sm:pb-10 px-4 sm:px-8 lg:px-12 relative overflow-hidden">
      {/* Background aperture watermark */}
      <div className="absolute right-0 bottom-0 opacity-[0.04] pointer-events-none translate-x-1/4 translate-y-1/4">
        <svg width="500" height="500" viewBox="0 0 500 500">
          {[220,180,140,100,60].map((r, i) => (
            <circle key={i} cx="250" cy="250" r={r} stroke="#e9c176" strokeWidth="1" fill="none"
              strokeDasharray={i % 2 === 0 ? 'none' : '3 6'} />
          ))}
          {[0,45,90,135,180,225,270,315].map((deg, i) => (
            <line key={i}
              x1={250 + 110 * Math.cos(deg * Math.PI / 180)}
              y1={250 + 110 * Math.sin(deg * Math.PI / 180)}
              x2={250 + 140 * Math.cos(deg * Math.PI / 180)}
              y2={250 + 140 * Math.sin(deg * Math.PI / 180)}
              stroke="#e9c176" strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-16 pb-12 sm:pb-16"
          style={{ borderBottom: '1px solid rgba(251,249,244,0.08)' }}>

          {/* Brand */}
          <div>
            <p className="font-[Noto_Serif] text-2xl font-light tracking-[0.25em] uppercase mb-3">
              A&amp;A Movies
            </p>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: '#e9c176' }}>
              Event Photography
            </p>
            <p className="text-[#d1c5b4] text-sm leading-relaxed max-w-xs">
              Timeless portraiture and cinematic event coverage for life's most sacred transitions.
            </p>
            {/* Aperture icon */}
            <div className="mt-8 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ border: '1px solid rgba(233,193,118,0.3)' }}>
                <span className="material-symbols-outlined text-sm" style={{ color: '#e9c176', fontVariationSettings: "'FILL' 0, 'wght' 100" }}>
                  photo_camera
                </span>
              </div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#d1c5b4] opacity-60">
                Est. 2012
              </span>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#d1c5b4] opacity-50 mb-8">Navigate</p>
            <div className="flex flex-col gap-4">
              {footerLinks.map(({ label, to }) => (
                <Link key={to} to={to}
                  className="text-sm tracking-widest uppercase text-[#fbf9f4] opacity-60 hover:opacity-100 hover:text-[#e9c176] transition-all duration-300"
                  style={{ textDecoration: 'none' }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact + Socials */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#d1c5b4] opacity-50 mb-8">Get in Touch</p>
            <div className="flex flex-col gap-3 mb-8">
              <a href="tel:+919837739595"
                className="flex items-center gap-3 text-sm text-[#fbf9f4] opacity-60 hover:opacity-100 hover:text-[#e9c176] transition-all"
                style={{ textDecoration: 'none' }}>
                <span className="material-symbols-outlined text-base" style={{ color: '#e9c176', fontVariationSettings: "'FILL' 1" }}>call</span>
                +91 98377 39595
              </a>
              <a href="mailto:aa.movies@gmail.com"
                className="flex items-center gap-3 text-sm text-[#fbf9f4] opacity-60 hover:opacity-100 hover:text-[#e9c176] transition-all"
                style={{ textDecoration: 'none' }}>
                <span className="material-symbols-outlined text-base" style={{ color: '#e9c176', fontVariationSettings: "'FILL' 1" }}>mail</span>
                aa.movies@gmail.com
              </a>
              <p className="flex items-start gap-3 text-sm text-[#fbf9f4] opacity-40">
                <span className="material-symbols-outlined text-base mt-0.5" style={{ color: '#e9c176', fontVariationSettings: "'FILL' 1" }}>location_on</span>
                 In Front of Pitambardas Mithaivala<br/>
                      Jhanda Chauraha, Mathura<br/>
                      Uttar Pradesh — 281001
              </p>
            </div>
            <div className="flex gap-4">
              {socials.map(({ label, href, icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ border: '1px solid rgba(233,193,118,0.2)', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(233,193,118,0.6)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(233,193,118,0.2)'}
                  title={label}>
                  <span className="material-symbols-outlined text-sm" style={{ color: '#e9c176', fontVariationSettings: "'FILL' 0, 'wght' 200" }}>
                    {icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] tracking-[0.15em] uppercase opacity-30">
            © {new Date().getFullYear()} A&amp;A Movies. All rights reserved.
          </p>
          <p className="font-[Noto_Serif] italic text-sm opacity-20">
            "Every frame, a forever."
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms'].map(t => (
              <a key={t} href="#"
                className="text-[10px] tracking-[0.15em] uppercase opacity-30 hover:opacity-60 transition-opacity"
                style={{ textDecoration: 'none', color: '#fbf9f4' }}>
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
