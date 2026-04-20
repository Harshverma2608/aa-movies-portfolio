import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { IMG } from '../hooks/useMedia'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  FadeUp, FadeLeft, FadeRight, StaggerContainer, StaggerItem,
  ClipReveal, ImageReveal, GoldLineDraw, MagneticButton,
} from '../components/AnimatedSection'

const albumTypes = ['Wedding Albums', 'Pre-Wedding', 'Portrait', 'Events']

const albums = {
  'Wedding Albums': [
    {
      name: 'The Classic',
      size: '12×12 inches',
      pages: '40 pages',
      material: 'Lay-flat Lustre',
      cover: 'Leatherette',
      price: '₹16,999',
      highlight: false,
      img: IMG.img2,
      desc: 'A timeless lay-flat album with premium lustre pages and a classic leatherette cover.',
    },
    {
      name: 'The Signature',
      size: '14×14 inches',
      pages: '60 pages',
      material: 'Lay-flat Metallic',
      cover: 'Genuine Leather',
      price: '₹28,999',
      highlight: true,
      img: IMG.img4,
      desc: 'Our most popular wedding album — metallic pages that make every image glow, bound in genuine leather.',
    },
    {
      name: 'The Heirloom',
      size: '16×16 inches',
      pages: '80 pages',
      material: 'Fine Art Matte',
      cover: 'Velvet + Acrylic Panel',
      price: '₹44,999',
      highlight: false,
      img: IMG.img3,
      desc: 'Museum-quality fine art matte paper in a velvet-wrapped cover with a custom acrylic photo panel.',
    },
  ],
  'Pre-Wedding': [
    {
      name: 'The Story',
      size: '10×10 inches',
      pages: '30 pages',
      material: 'Lay-flat Lustre',
      cover: 'Linen',
      price: '₹9,999',
      highlight: false,
      img: IMG.img5,
      desc: 'A compact, beautifully crafted photobook that tells your pre-wedding story.',
    },
    {
      name: 'The Journey',
      size: '12×12 inches',
      pages: '50 pages',
      material: 'Lay-flat Metallic',
      cover: 'Genuine Leather',
      price: '₹18,999',
      highlight: true,
      img: IMG.img6,
      desc: 'Metallic pages that capture the golden hour magic of your pre-wedding shoot.',
    },
    {
      name: 'The Destination',
      size: '14×14 inches',
      pages: '60 pages',
      material: 'Fine Art Matte',
      cover: 'Velvet + Acrylic Panel',
      price: '₹29,999',
      highlight: false,
      img: IMG.img2,
      desc: 'For destination shoots — a luxury fine art album worthy of the journey.',
    },
  ],
  Portrait: [
    {
      name: 'The Mini',
      size: '8×8 inches',
      pages: '20 pages',
      material: 'Lustre',
      cover: 'Linen',
      price: '₹5,999',
      highlight: false,
      img: IMG.img3,
      desc: 'A compact portrait book — perfect for individuals, couples, or small families.',
    },
    {
      name: 'The Family',
      size: '12×12 inches',
      pages: '40 pages',
      material: 'Lay-flat Lustre',
      cover: 'Leatherette',
      price: '₹13,999',
      highlight: true,
      img: IMG.img5,
      desc: 'A generous lay-flat album to preserve your family portraits for generations.',
    },
    {
      name: 'The Heritage',
      size: '14×14 inches',
      pages: '60 pages',
      material: 'Fine Art Matte',
      cover: 'Velvet + Acrylic Panel',
      price: '₹24,999',
      highlight: false,
      img: IMG.img4,
      desc: 'A legacy album — fine art quality that will outlast generations.',
    },
  ],
  Events: [
    {
      name: 'The Moment',
      size: '10×10 inches',
      pages: '30 pages',
      material: 'Lustre',
      cover: 'Linen',
      price: '₹7,999',
      highlight: false,
      img: IMG.img6,
      desc: 'Capture birthdays, anniversaries, and celebrations in a beautiful compact book.',
    },
    {
      name: 'The Celebration',
      size: '12×12 inches',
      pages: '50 pages',
      material: 'Lay-flat Metallic',
      cover: 'Leatherette',
      price: '₹15,999',
      highlight: true,
      img: IMG.img2,
      desc: 'Metallic pages that make every celebration look cinematic and grand.',
    },
    {
      name: 'The Corporate',
      size: '14×14 inches',
      pages: '60 pages',
      material: 'Fine Art Matte',
      cover: 'Genuine Leather',
      price: 'Custom',
      highlight: false,
      img: IMG.img3,
      desc: 'Branded corporate event albums with custom cover embossing and commercial delivery.',
    },
  ],
}

const features = [
  { icon: 'layers',        title: 'Lay-Flat Binding',    desc: 'Pages open completely flat — no gutter, no lost detail.' },
  { icon: 'palette',       title: 'Archival Inks',       desc: 'Fade-resistant prints guaranteed for 100+ years.'        },
  { icon: 'design_services', title: 'Custom Design',     desc: 'Every spread is hand-designed by our album artists.'     },
  { icon: 'verified',      title: 'Quality Checked',     desc: 'Each album is inspected before dispatch.'                },
  { icon: 'local_shipping', title: 'Insured Delivery',   desc: 'Fully insured door-to-door delivery across India.'       },
  { icon: 'edit_note',     title: 'Free Revisions',      desc: 'Two rounds of design revisions included.'                },
]

export default function Albums() {
  const [activeType, setActiveType] = useState('Wedding Albums')
  const [lightbox, setLightbox] = useState(null)

  return (
    <div className="bg-[#fbf9f4] text-[#1b1c19]">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-[55vh] sm:h-[65vh] flex items-end overflow-hidden">
        <img src={IMG.hero} alt="Albums" className="absolute inset-0 w-full h-full object-cover animate-slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/75" />
        <div className="relative z-10 px-6 sm:px-12 pb-10 sm:pb-16 max-w-7xl w-full mx-auto">
          <p className="animate-fade-up text-[10px] tracking-[0.5em] uppercase mb-3 sm:mb-4" style={{ color: '#e9c176' }}>
            Handcrafted Memories
          </p>
          <h1 className="animate-fade-up-delay font-[Noto_Serif] text-4xl sm:text-6xl md:text-8xl font-light text-[#fbf9f4] leading-tight">
            Our Albums
          </h1>
        </div>
      </section>

      <main className="pb-24">

        {/* ── INTRO ── */}
        <section className="py-16 sm:py-24 px-6 sm:px-12 bg-[#fbf9f4]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeLeft>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#775a19] mb-6">The Craft</p>
              <ClipReveal>
                <h2 className="font-[Noto_Serif] text-4xl sm:text-5xl font-light leading-tight mb-8">
                  An album is not a product.<br />
                  <span className="italic text-[#775a19]">It is a legacy.</span>
                </h2>
              </ClipReveal>
              <p className="text-[#4e4639] leading-relaxed text-lg mb-6 max-w-lg">
                Every album we create is hand-designed by our in-house artists, printed on archival-quality
                paper, and bound with materials that last generations. We believe your photographs deserve
                a home as beautiful as the moments they capture.
              </p>
              <GoldLineDraw width={80} delay={0.3} />
            </FadeLeft>
            <FadeRight delay={0.15}>
              <ImageReveal src={IMG.img4} alt="Album craft" className="w-full aspect-[4/3]" />
            </FadeRight>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="py-16 sm:py-20 px-6 sm:px-12 bg-[#f5f3ee]">
          <div className="max-w-7xl mx-auto">
            <FadeUp className="mb-12">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#775a19] mb-3">Why Our Albums</p>
              <h2 className="font-[Noto_Serif] text-3xl sm:text-4xl font-light">Built to Last Forever</h2>
            </FadeUp>
            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8" stagger={0.08}>
              {features.map((f, i) => (
                <StaggerItem key={i}>
                  <motion.div className="bg-white p-6 sm:p-8"
                    whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(27,28,25,0.07)' }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}>
                    <span className="material-symbols-outlined text-3xl mb-4 block"
                      style={{ color: '#775a19', fontVariationSettings: "'FILL' 0, 'wght' 200" }}>
                      {f.icon}
                    </span>
                    <h3 className="font-[Noto_Serif] text-lg mb-2">{f.title}</h3>
                    <p className="text-[#4e4639] text-sm leading-relaxed">{f.desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── TYPE TABS ── */}
        <section className="sticky top-[60px] z-40 bg-[#fbf9f4]/95 backdrop-blur-md"
          style={{ borderBottom: '1px solid rgba(209,197,180,0.3)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-12 overflow-x-auto">
            <div className="flex gap-0 min-w-max sm:min-w-0">
              {albumTypes.map(type => (
                <button key={type} onClick={() => setActiveType(type)}
                  className="relative px-4 sm:px-8 py-4 sm:py-5 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-300"
                  style={{ color: activeType === type ? '#775a19' : '#4e4639' }}>
                  {type}
                  <motion.span className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: '#775a19' }}
                    initial={false}
                    animate={{ scaleX: activeType === type ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── ALBUM CARDS ── */}
        <section className="py-16 sm:py-24 px-6 sm:px-12">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div key={activeType}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                {albums[activeType].map((album, i) => (
                  <motion.div key={album.name}
                    className="group relative flex flex-col"
                    initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}>

                    {album.highlight && (
                      <div className="absolute -top-3 left-6 z-10">
                        <span className="gold-gradient text-[#261900] text-[9px] tracking-[0.2em] uppercase font-bold px-4 py-1 rounded-sm">
                          Most Popular
                        </span>
                      </div>
                    )}

                    {/* Image */}
                    <div className="overflow-hidden cursor-pointer img-loupe"
                      style={{ height: '260px' }}
                      onClick={() => setLightbox(album.img)}>
                      <motion.img src={album.img} alt={album.name}
                        className="w-full h-full object-cover object-center"
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
                    </div>

                    {/* Info */}
                    <div className={`flex flex-col flex-1 p-6 sm:p-8 transition-all duration-500 ${
                      album.highlight
                        ? 'bg-[#1b1c19] text-[#fbf9f4]'
                        : 'bg-white group-hover:shadow-[0_20px_40px_rgba(27,28,25,0.07)]'
                    }`}>
                      <h3 className="font-[Noto_Serif] text-2xl font-light mb-2">{album.name}</h3>
                      <p className="text-sm leading-relaxed mb-6 flex-1"
                        style={{ color: album.highlight ? 'rgba(251,249,244,0.7)' : '#4e4639' }}>
                        {album.desc}
                      </p>

                      {/* Specs */}
                      <div className="grid grid-cols-2 gap-2 mb-6 text-[10px] tracking-widest uppercase">
                        {[
                          { label: 'Size',     val: album.size     },
                          { label: 'Pages',    val: album.pages    },
                          { label: 'Paper',    val: album.material },
                          { label: 'Cover',    val: album.cover    },
                        ].map(({ label, val }) => (
                          <div key={label} className="py-2"
                            style={{ borderTop: `1px solid ${album.highlight ? 'rgba(255,255,255,0.08)' : 'rgba(209,197,180,0.3)'}` }}>
                            <p style={{ color: album.highlight ? 'rgba(233,193,118,0.6)' : '#7f7667' }}>{label}</p>
                            <p className="mt-0.5" style={{ color: album.highlight ? '#fbf9f4' : '#1b1c19' }}>{val}</p>
                          </div>
                        ))}
                      </div>

                      {/* Price + CTA */}
                      <div className="flex items-center justify-between">
                        <p className="font-[Noto_Serif] text-3xl font-light"
                          style={{ color: album.highlight ? '#e9c176' : '#1b1c19' }}>
                          {album.price}
                        </p>
                        <Link to="/contact" style={{ textDecoration: 'none' }}>
                          <motion.button
                            className="px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-semibold"
                            style={album.highlight ? {
                              background: 'linear-gradient(135deg,#ffdea5,#e9c176)',
                              color: '#261900',
                            } : {
                              border: '1px solid rgba(119,90,25,0.3)',
                              color: '#775a19',
                            }}
                            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                            Order
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── LIGHTBOX ── */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-8"
              style={{ background: 'rgba(27,28,25,0.95)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}>
              <motion.img src={lightbox} alt="Album preview"
                className="max-w-full max-h-full object-contain"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={e => e.stopPropagation()} />
              <button className="absolute top-6 right-8 text-white opacity-60 hover:opacity-100 transition-opacity"
                onClick={() => setLightbox(null)}>
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── PROCESS ── */}
        <section className="py-16 sm:py-24 px-6 sm:px-12 bg-[#1b1c19] text-[#fbf9f4] relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
            <svg width="600" height="600" viewBox="0 0 600 600">
              {[250,200,150,100].map((r,i)=>(
                <circle key={i} cx="300" cy="300" r={r} stroke="#e9c176" strokeWidth="1" fill="none"/>
              ))}
            </svg>
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <FadeUp className="mb-12 sm:mb-16">
              <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: '#e9c176' }}>How It Works</p>
              <h2 className="font-[Noto_Serif] text-3xl sm:text-5xl font-light">From Shoot to Shelf</h2>
            </FadeUp>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" stagger={0.12}>
              {[
                { num: '01', title: 'Photo Selection',  desc: 'You choose your favourite images from our online gallery.' },
                { num: '02', title: 'Design Draft',     desc: 'Our artists create a custom layout within 7 days.'         },
                { num: '03', title: 'Your Approval',    desc: 'Review and request up to 2 rounds of revisions.'           },
                { num: '04', title: 'Print & Deliver',  desc: 'Printed, bound, and delivered to your door in 4–6 weeks.'  },
              ].map((step, i) => (
                <StaggerItem key={i}>
                  <div className="p-6 sm:p-8" style={{ borderTop: '1px solid rgba(233,193,118,0.15)' }}>
                    <span className="font-[Noto_Serif] text-5xl italic mb-6 block" style={{ color: '#e9c176', opacity: 0.4 }}>
                      {step.num}
                    </span>
                    <h3 className="font-[Noto_Serif] text-xl mb-3">{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(251,249,244,0.6)' }}>{step.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 sm:py-40 px-6 sm:px-12 text-center bg-[#fbf9f4]">
          <FadeUp className="max-w-2xl mx-auto">
            <p className="text-[10px] tracking-[0.5em] uppercase text-[#775a19] mb-6 sm:mb-8">Order Yours</p>
            <ClipReveal>
              <h2 className="font-[Noto_Serif] text-3xl sm:text-5xl font-light mb-8 sm:mb-12">
                Your story deserves a<br />
                <span className="italic text-[#775a19]">beautiful home</span>.
              </h2>
            </ClipReveal>
            <MagneticButton>
              <Link to="/contact">
                <motion.button
                  className="gold-gradient text-[#261900] px-10 sm:px-14 py-4 sm:py-5 text-xs tracking-[0.3em] uppercase font-bold rounded-sm"
                  style={{ boxShadow: '0 20px 40px rgba(119,90,25,0.2)' }}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                  Order Your Album
                </motion.button>
              </Link>
            </MagneticButton>
          </FadeUp>
        </section>
      </main>

      <Footer />
    </div>
  )
}



