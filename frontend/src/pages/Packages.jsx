import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { IMG } from '../hooks/useMedia'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FadeUp, StaggerContainer, StaggerItem, ClipReveal, GoldLineDraw } from '../components/AnimatedSection'

/* ─── PACKAGE DATA ─── */
const eventTypes = ['Wedding', 'Pre-Wedding', 'Portrait', 'Birthday & Events']

const packages = {
  Wedding: [
    {
      name: 'Silver',
      tag: 'Essential',
      price: '₹49,999',
      duration: '1 Day',
      highlight: false,
      features: [
        '8 Hours Coverage',
        '1 Photographer',
        '400+ Edited Photos',
        'Online Gallery (1 Year)',
        'USB Drive Delivery',
        'Basic Retouch',
      ],
      note: 'Ideal for intimate ceremonies',
    },
    {
      name: 'Gold',
      tag: 'Most Popular',
      price: '₹89,999',
      duration: '2 Days',
      highlight: true,
      features: [
        '16 Hours Coverage',
        '2 Photographers',
        '800+ Edited Photos',
        '1 Cinematic Film (5 min)',
        'Online Gallery (2 Years)',
        'Premium Album (40 pages)',
        'Drone Shots (if permitted)',
        'Same-Day Preview (20 photos)',
      ],
      note: 'Our signature wedding package',
    },
    {
      name: 'Platinum',
      tag: 'Premium',
      price: '₹1,49,999',
      duration: '3 Days',
      highlight: false,
      features: [
        'Mehendi + Sangeet + Wedding',
        '3 Photographers + 1 Videographer',
        '1500+ Edited Photos',
        '2 Cinematic Films (5 + 10 min)',
        'Teaser Reel (60 sec)',
        'Luxury Album (60 pages)',
        'Drone Coverage',
        'Same-Day Highlights',
        'Lifetime Online Gallery',
        'Dedicated Album Designer',
      ],
      note: 'The complete luxury experience',
    },
  ],
  'Pre-Wedding': [
    {
      name: 'Classic',
      tag: 'Essential',
      price: '₹19,999',
      duration: '3–4 Hours',
      highlight: false,
      features: [
        '1 Location',
        '1 Photographer',
        '150+ Edited Photos',
        'Online Gallery',
        'Basic Retouch',
      ],
      note: 'Perfect for a single location shoot',
    },
    {
      name: 'Signature',
      tag: 'Most Popular',
      price: '₹34,999',
      duration: 'Full Day',
      highlight: true,
      features: [
        '2–3 Locations',
        '1 Photographer + Assistant',
        '300+ Edited Photos',
        'Short Film (2 min)',
        'Premium Retouch',
        'Online Gallery (1 Year)',
        'Printed Photobook (20 pages)',
      ],
      note: 'Our most loved pre-wedding package',
    },
    {
      name: 'Destination',
      tag: 'Premium',
      price: 'Custom',
      duration: '2 Days',
      highlight: false,
      features: [
        'Destination of Your Choice',
        '2 Photographers',
        '500+ Edited Photos',
        'Cinematic Film (3 min)',
        'Luxury Photobook',
        'Drone Coverage',
        'Travel Included (India)',
      ],
      note: 'For couples who dream big',
    },
  ],
  Portrait: [
    {
      name: 'Mini',
      tag: 'Quick Session',
      price: '₹7,999',
      duration: '1 Hour',
      highlight: false,
      features: [
        '1 Location',
        '50+ Edited Photos',
        'Online Gallery',
        'Basic Retouch',
      ],
      note: 'Great for individuals & couples',
    },
    {
      name: 'Standard',
      tag: 'Most Popular',
      price: '₹14,999',
      duration: '2–3 Hours',
      highlight: true,
      features: [
        '2 Locations',
        '120+ Edited Photos',
        'Premium Retouch',
        'Online Gallery (1 Year)',
        '10 Printed Photos (5×7)',
      ],
      note: 'Ideal for families & professionals',
    },
    {
      name: 'Heritage',
      tag: 'Premium',
      price: '₹24,999',
      duration: 'Full Day',
      highlight: false,
      features: [
        'Multiple Locations',
        '250+ Edited Photos',
        'Fine Art Retouch',
        'Framed Print (16×20)',
        'Luxury Photobook',
        'Lifetime Online Gallery',
      ],
      note: 'A timeless family legacy session',
    },
  ],
  'Birthday & Events': [
    {
      name: 'Basic',
      tag: 'Essential',
      price: '₹12,999',
      duration: '3 Hours',
      highlight: false,
      features: [
        '1 Photographer',
        '200+ Edited Photos',
        'Online Gallery',
        'Basic Retouch',
      ],
      note: 'Birthdays, baby showers & more',
    },
    {
      name: 'Premium',
      tag: 'Most Popular',
      price: '₹24,999',
      duration: '6 Hours',
      highlight: true,
      features: [
        '2 Photographers',
        '400+ Edited Photos',
        'Short Highlight Film (2 min)',
        'Premium Retouch',
        'Online Gallery (1 Year)',
        'Same-Day Preview (30 photos)',
      ],
      note: 'Perfect for milestone celebrations',
    },
    {
      name: 'Corporate',
      tag: 'Enterprise',
      price: 'Custom',
      duration: 'As Required',
      highlight: false,
      features: [
        'Dedicated Team',
        'Full Event Coverage',
        'Branded Delivery',
        'Quick Turnaround (48 hrs)',
        'Commercial License',
        'Drone (if applicable)',
      ],
      note: 'Conferences, launches & brand events',
    },
  ],
}

const addOns = [
  { icon: 'photo_album',    label: 'Extra Album Pages',    price: '₹500 / page'   },
  { icon: 'movie',          label: 'Extended Film Edit',   price: '₹8,000'        },
  { icon: 'flight',         label: 'Outstation Travel',    price: 'At Actuals'    },
  { icon: 'frame_person',   label: 'Extra Photographer',   price: '₹6,000 / day'  },
  { icon: 'hdr_strong',     label: 'Drone Coverage',       price: '₹5,000'        },
  { icon: 'speed',          label: 'Express Delivery',     price: '₹3,000'        },
  { icon: 'print',          label: 'Canvas Print (24×36)', price: '₹4,500'        },
  { icon: 'slideshow',      label: 'Teaser Reel (60 sec)', price: '₹4,000'        },
]

export default function Packages() {
  const [activeEvent, setActiveEvent] = useState('Wedding')

  return (
    <div className="bg-[#fbf9f4] text-[#1b1c19]">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-[55vh] sm:h-[65vh] flex items-end overflow-hidden">
        <img src={IMG.hero} alt="Packages" className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/75"/>
        <div className="relative z-10 px-6 sm:px-12 pb-10 sm:pb-16 max-w-7xl w-full mx-auto">
          <p className="animate-fade-up text-[10px] tracking-[0.5em] uppercase mb-3 sm:mb-4 font-oswald" style={{color:'#e9c176'}}>
            Transparent Pricing
          </p>
          <h1 className="animate-fade-up-delay font-unna font-light text-[#fbf9f4] leading-tight"
            style={{fontSize:'clamp(2.5rem, 8vw, 5.5rem)'}}>
            Our Packages
          </h1>
        </div>
      </section>

      <main className="pb-24">

        {/* ── EVENT TYPE TABS ── */}
        <section className="sticky top-[60px] z-40 bg-[#fbf9f4]/95 backdrop-blur-md border-b border-[#d1c5b4]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-12 overflow-x-auto">
            <div className="flex gap-0 min-w-max sm:min-w-0">
              {eventTypes.map(type => (
                <button key={type} onClick={() => setActiveEvent(type)}
                  className="relative px-4 sm:px-8 py-4 sm:py-5 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-300"
                  style={{ color: activeEvent === type ? '#775a19' : '#4e4639' }}>
                  {type}
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: '#775a19' }}
                    initial={false}
                    animate={{ scaleX: activeEvent === type ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── PACKAGE CARDS ── */}
        <section className="py-16 sm:py-24 px-4 sm:px-12">
          <div className="max-w-7xl mx-auto">
            <FadeUp className="mb-10 sm:mb-16">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#775a19] mb-3">{activeEvent} Photography</p>
              <h2 className="font-[Noto_Serif] text-3xl sm:text-5xl font-light">Choose Your Package</h2>
            </FadeUp>

            <AnimatePresence mode="wait">
              <motion.div key={activeEvent}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-16 }}
                transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}>
                {packages[activeEvent].map((pkg, i) => (
                  <motion.div key={pkg.name}
                    className="relative flex flex-col"
                    initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }}
                    transition={{ duration:0.6, delay:i*0.1, ease:[0.16,1,0.3,1] }}>

                    {pkg.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        <span className="gold-gradient text-[#261900] text-[9px] tracking-[0.2em] uppercase font-bold px-4 py-1 rounded-sm">
                          {pkg.tag}
                        </span>
                      </div>
                    )}

                    <div className={`flex flex-col h-full p-6 sm:p-10 transition-all duration-500 ${
                      pkg.highlight
                        ? 'bg-[#1b1c19] text-[#fbf9f4] shadow-[0_32px_64px_rgba(27,28,25,0.2)]'
                        : 'bg-white hover:shadow-[0_20px_40px_rgba(27,28,25,0.07)]'
                    }`}>

                      {/* Header */}
                      <div className="mb-6 sm:mb-8">
                        {!pkg.highlight && (
                          <span className="text-[9px] tracking-[0.25em] uppercase mb-3 block"
                            style={{ color: '#775a19' }}>{pkg.tag}</span>
                        )}
                        <h3 className="font-[Noto_Serif] text-2xl sm:text-3xl font-light mb-1">{pkg.name}</h3>
                        <p className="text-[10px] tracking-widest uppercase"
                          style={{ color: pkg.highlight ? 'rgba(233,193,118,0.7)' : '#7f7667' }}>
                          {pkg.duration}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="mb-6 sm:mb-8 pb-6 sm:pb-8"
                        style={{ borderBottom: `1px solid ${pkg.highlight ? 'rgba(255,255,255,0.1)' : 'rgba(209,197,180,0.3)'}` }}>
                        <p className="font-[Noto_Serif] font-light"
                          style={{
                            fontSize:'clamp(1.8rem, 6vw, 3rem)',
                            color: pkg.highlight ? '#e9c176' : '#1b1c19'
                          }}>
                          {pkg.price}
                        </p>
                        <p className="text-[10px] tracking-widest uppercase mt-1"
                          style={{ color: pkg.highlight ? 'rgba(251,249,244,0.4)' : '#7f7667' }}>
                          Starting price
                        </p>
                      </div>

                      {/* Features */}
                      <ul className="flex-1 space-y-3 mb-8 sm:mb-10">
                        {pkg.features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-3 text-sm leading-relaxed"
                            style={{ color: pkg.highlight ? 'rgba(251,249,244,0.8)' : '#4e4639' }}>
                            <span className="material-symbols-outlined text-base flex-shrink-0 mt-0.5"
                              style={{ color: pkg.highlight ? '#e9c176' : '#775a19', fontVariationSettings:"'FILL' 1, 'wght' 300" }}>
                              check_circle
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>

                      {/* Note */}
                      <p className="text-[10px] tracking-widest uppercase mb-6 italic"
                        style={{ color: pkg.highlight ? 'rgba(233,193,118,0.6)' : '#7f7667' }}>
                        {pkg.note}
                      </p>

                      {/* CTA */}
                      <Link to="/contact" style={{ textDecoration:'none' }}>
                        <motion.button
                          className="w-full py-4 text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300"
                          style={pkg.highlight ? {
                            background: 'linear-gradient(135deg,#ffdea5,#e9c176)',
                            color: '#261900',
                          } : {
                            border: '1px solid rgba(119,90,25,0.3)',
                            color: '#775a19',
                            background: 'transparent',
                          }}
                          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          transition={{ type:'spring', stiffness:400, damping:25 }}>
                          Book This Package
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── ADD-ONS ── */}
        <section className="py-16 sm:py-24 px-4 sm:px-12 bg-[#f5f3ee]">
          <div className="max-w-7xl mx-auto">
            <FadeUp className="mb-10 sm:mb-16">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#775a19] mb-3">Customise</p>
              <h2 className="font-[Noto_Serif] text-3xl sm:text-5xl font-light">Add-Ons</h2>
              <p className="text-[#4e4639] mt-4 max-w-lg text-sm sm:text-base">
                Enhance any package with these optional extras. Mix and match to build your perfect coverage.
              </p>
            </FadeUp>
            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6" stagger={0.07}>
              {addOns.map((a, i) => (
                <StaggerItem key={i}>
                  <motion.div className="bg-white p-5 sm:p-8 text-center"
                    whileHover={{ y:-4, boxShadow:'0 16px 32px rgba(27,28,25,0.07)' }}
                    transition={{ type:'spring', stiffness:200, damping:25 }}>
                    <span className="material-symbols-outlined text-3xl sm:text-4xl mb-3 sm:mb-4 block"
                      style={{ color:'#775a19', fontVariationSettings:"'FILL' 0, 'wght' 200" }}>
                      {a.icon}
                    </span>
                    <p className="font-[Noto_Serif] text-sm sm:text-base mb-2 leading-snug">{a.label}</p>
                    <p className="text-[10px] tracking-widest uppercase" style={{ color:'#775a19' }}>{a.price}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── NOTES ── */}
        <section className="py-12 sm:py-16 px-4 sm:px-12 bg-[#fbf9f4]">
          <div className="max-w-4xl mx-auto">
            <FadeUp>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#775a19] mb-6">Important Notes</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  'All prices are starting prices. Final quote depends on location, travel, and specific requirements.',
                  'A 30% advance is required to confirm the booking. Balance due 7 days before the event.',
                  'Travel charges apply for locations outside Agra/Mathura. Outstation stays at actuals.',
                  'Edited photos are delivered within 3–4 weeks. Albums take 6–8 weeks after photo selection.',
                  'All packages include full copyright of images for personal use. Commercial use requires separate licensing.',
                  'Cancellation policy: 50% refund if cancelled 30+ days before event. No refund within 30 days.',
                ].map((note, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-[#f5f3ee]">
                    <span className="material-symbols-outlined text-sm flex-shrink-0 mt-0.5"
                      style={{ color:'#775a19', fontVariationSettings:"'FILL' 0, 'wght' 300" }}>info</span>
                    <p className="text-xs sm:text-sm text-[#4e4639] leading-relaxed">{note}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 sm:py-40 px-4 sm:px-12 text-center bg-[#f5f3ee] relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
            <svg width="500" height="500" viewBox="0 0 500 500">
              {[220,180,140,100,60].map((r,i)=>(
                <circle key={i} cx="250" cy="250" r={r} stroke="#775a19" strokeWidth="1" fill="none"
                  strokeDasharray={i%2===0?'none':'4 8'}/>
              ))}
            </svg>
          </div>
          <FadeUp className="relative z-10 max-w-2xl mx-auto">
            <p className="text-[10px] tracking-[0.5em] uppercase text-[#775a19] mb-6 sm:mb-8">Not Sure?</p>
            <ClipReveal>
              <h2 className="font-[Noto_Serif] text-3xl sm:text-5xl font-light mb-6 sm:mb-10">
                Let's build a custom package for you.
              </h2>
            </ClipReveal>
            <p className="text-[#4e4639] mb-8 sm:mb-12 text-sm sm:text-base">
              Every event is unique. Reach out and we'll craft a bespoke quote tailored to your vision and budget.
            </p>
            <Link to="/contact">
              <motion.button
                className="gold-gradient text-[#261900] px-10 sm:px-14 py-4 sm:py-5 text-xs tracking-[0.3em] uppercase font-bold rounded-sm"
                style={{ boxShadow:'0 20px 40px rgba(119,90,25,0.2)' }}
                whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                transition={{ type:'spring', stiffness:300, damping:20 }}>
                Get a Custom Quote
              </motion.button>
            </Link>
          </FadeUp>
        </section>
      </main>

      <Footer/>
    </div>
  )
}



