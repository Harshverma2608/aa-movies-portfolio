import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { IMG } from '../hooks/useMedia'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FadeUp, FadeLeft, FadeRight, ClipReveal, ScrollProgressBar } from '../components/AnimatedSection'
import axios from 'axios'

const SUBJECTS = [
  'Wedding Enquiry',
  'Pre-Wedding Shoot',
  'Portrait Session',
  'Event Coverage',
  'Album Order',
  'Other',
]

const E = [0.16, 1, 0.3, 1]

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: 'Wedding Enquiry', message: '', date: '',
  })
  const [status, setStatus]   = useState(null) // null | 'success' | 'error'
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState('')
  const [errors, setErrors]   = useState({})
  const formRef = useRef(null)

  function validate() {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setStatus(null)
    try {
      await axios.post('/api/contact', form)
      setStatus('success')
      setForm({ name:'', email:'', phone:'', subject:'Wedding Enquiry', message:'', date:'' })
      setErrors({})
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } catch (err) {
      setStatus(err.response?.data?.error || 'error')
    } finally {
      setLoading(false)
    }
  }

  // Shared input class
  const inputBase = `w-full bg-transparent outline-none py-3 text-sm text-[#1b1c19] placeholder-[#b0a898] transition-all duration-300`

  function fieldBorder(name) {
    return `border-b ${errors[name] ? 'border-red-400' : focused === name ? 'border-[#775a19]' : 'border-[#d1c5b4]'}`
  }

  return (
    <div className="bg-[#fbf9f4] text-[#1b1c19] min-h-screen">
      <ScrollProgressBar/>
      <Navbar/>

      {/* ── HERO ── */}
      <section className="relative flex items-end overflow-hidden" style={{height:'clamp(280px,50vh,60vh)'}}>
        <img src={IMG.img4} alt="Contact A&A Movies"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager" fetchPriority="high" width="1920" height="1080"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80"/>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-8 sm:pb-14">
          <p className="animate-fade-up font-oswald text-[10px] tracking-[0.5em] uppercase mb-3"
            style={{color:'#e9c176'}}>
            Begin the Conversation
          </p>
          <h1 className="animate-fade-up-delay font-unna font-light text-[#fbf9f4] leading-tight"
            style={{fontSize:'clamp(2.2rem, 7vw, 5rem)'}}>
            Let's <span className="italic">Connect</span>
          </h1>
        </div>
      </section>

      <main>
        {/* ── INTRO ── */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-14">
          <FadeUp>
            <p className="text-[#4e4639] text-base sm:text-lg max-w-2xl leading-relaxed">
              Every frame is a dialogue. Share your vision with us and we'll compose something timeless together.
              We respond to all enquiries within <strong>24 hours</strong>.
            </p>
          </FadeUp>
        </section>

        {/* ── FORM + INFO ── */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-16 sm:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

            {/* ── FORM ── */}
            <FadeLeft className="lg:col-span-7">
              <div ref={formRef} className="bg-[#f5f3ee] p-6 sm:p-10 lg:p-14">
                <p className="font-oswald text-[10px] tracking-[0.3em] uppercase text-[#775a19] mb-8">
                  Send an Enquiry
                </p>

                {/* Success */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                      transition={{duration:0.4,ease:E}}
                      className="mb-8 p-4 sm:p-5 flex items-start gap-3"
                      style={{background:'linear-gradient(135deg,#ffdea5,#e9c176)',color:'#261900'}}>
                      <span className="material-symbols-outlined text-xl flex-shrink-0"
                        style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                      <div>
                        <p className="font-oswald text-xs tracking-widest uppercase font-semibold">Message Sent!</p>
                        <p className="text-xs mt-1 opacity-80">We'll get back to you within 24 hours. Check your inbox for a confirmation.</p>
                      </div>
                    </motion.div>
                  )}
                  {status && status !== 'success' && (
                    <motion.div
                      initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                      transition={{duration:0.4,ease:E}}
                      className="mb-8 p-4 flex items-start gap-3"
                      style={{background:'#ffdad6',color:'#93000a'}}>
                      <span className="material-symbols-outlined text-xl flex-shrink-0"
                        style={{fontVariationSettings:"'FILL' 1"}}>error</span>
                      <div>
                        <p className="font-oswald text-xs tracking-widest uppercase font-semibold">Something went wrong</p>
                        <p className="text-xs mt-1 opacity-80">
                          {typeof status === 'string' && status !== 'error' ? status : 'Please try again or call us directly.'}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                    <div>
                      <label className="block font-oswald text-[10px] tracking-[0.2em] uppercase text-[#7f7667] mb-2">
                        Full Name <span className="text-[#775a19]">*</span>
                      </label>
                      <input
                        className={`${inputBase} ${fieldBorder('name')}`}
                        type="text" name="name" placeholder="Your Name"
                        value={form.name} onChange={handleChange}
                        onFocus={()=>setFocused('name')} onBlur={()=>setFocused('')}
                        autoComplete="name"/>
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block font-oswald text-[10px] tracking-[0.2em] uppercase text-[#7f7667] mb-2">
                        Email <span className="text-[#775a19]">*</span>
                      </label>
                      <input
                        className={`${inputBase} ${fieldBorder('email')}`}
                        type="email" name="email" placeholder="your@email.com"
                        value={form.email} onChange={handleChange}
                        onFocus={()=>setFocused('email')} onBlur={()=>setFocused('')}
                        autoComplete="email"/>
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Phone + Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                    <div>
                      <label className="block font-oswald text-[10px] tracking-[0.2em] uppercase text-[#7f7667] mb-2">
                        Phone Number
                      </label>
                      <input
                        className={`${inputBase} ${fieldBorder('phone')}`}
                        type="tel" name="phone" placeholder="+91 98377 39595"
                        value={form.phone} onChange={handleChange}
                        onFocus={()=>setFocused('phone')} onBlur={()=>setFocused('')}
                        autoComplete="tel"/>
                    </div>
                    <div>
                      <label className="block font-oswald text-[10px] tracking-[0.2em] uppercase text-[#7f7667] mb-2">
                        Event Date (if known)
                      </label>
                      <input
                        className={`${inputBase} ${fieldBorder('date')}`}
                        type="date" name="date"
                        value={form.date} onChange={handleChange}
                        onFocus={()=>setFocused('date')} onBlur={()=>setFocused('')}
                        min={new Date().toISOString().split('T')[0]}/>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="mb-6 sm:mb-8">
                    <label className="block font-oswald text-[10px] tracking-[0.2em] uppercase text-[#7f7667] mb-2">
                      Subject
                    </label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {SUBJECTS.map(s => (
                        <button key={s} type="button"
                          onClick={()=>setForm(f=>({...f,subject:s}))}
                          className="px-3 py-1.5 text-[10px] tracking-widest uppercase transition-all duration-200"
                          style={{
                            background: form.subject===s ? 'linear-gradient(135deg,#ffdea5,#e9c176)' : 'transparent',
                            color: form.subject===s ? '#261900' : '#7f7667',
                            border: `1px solid ${form.subject===s ? 'transparent' : 'rgba(127,118,103,0.3)'}`,
                          }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-8 sm:mb-10">
                    <label className="block font-oswald text-[10px] tracking-[0.2em] uppercase text-[#7f7667] mb-2">
                      Message <span className="text-[#775a19]">*</span>
                    </label>
                    <textarea
                      className={`${inputBase} ${fieldBorder('message')}`}
                      name="message" placeholder="Tell us about your event, vision, and any specific requirements..."
                      rows="5" style={{resize:'none'}}
                      value={form.message} onChange={handleChange}
                      onFocus={()=>setFocused('message')} onBlur={()=>setFocused('')}/>
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit" disabled={loading}
                    className="w-full sm:w-auto px-10 sm:px-14 py-4 font-oswald text-xs tracking-[0.3em] uppercase font-semibold disabled:opacity-60 flex items-center justify-center gap-3"
                    style={{background:'linear-gradient(135deg,#ffdea5,#e9c176)',color:'#261900',minHeight:'52px'}}
                    whileHover={!loading?{scale:1.02}:{}}
                    whileTap={!loading?{scale:0.98}:{}}
                    transition={{type:'spring',stiffness:400,damping:25}}>
                    {loading ? (
                      <>
                        <motion.span
                          className="material-symbols-outlined text-base"
                          animate={{rotate:360}} transition={{duration:1,repeat:Infinity,ease:'linear'}}>
                          refresh
                        </motion.span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-base"
                          style={{fontVariationSettings:"'FILL' 0, 'wght' 300"}}>send</span>
                        Send Enquiry
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </FadeLeft>

            {/* ── INFO ── */}
            <FadeRight className="lg:col-span-5" delay={0.1}>
              <div className="flex flex-col gap-8 h-full">

                {/* Studio image */}
                <div className="overflow-hidden" style={{height:'clamp(180px,25vw,260px)'}}>
                  <img src={IMG.img3} alt="A&A Movies Studio"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"/>
                </div>

                {/* Info cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">

                  {/* Address */}
                  <div className="bg-[#f5f3ee] p-5 sm:p-6">
                    <p className="font-oswald text-[10px] tracking-[0.3em] uppercase text-[#7f7667] mb-4">The Studio</p>
                    <p className="text-[#4e4639] text-sm leading-relaxed">
                      In Front of Pitambardas Mithaivala<br/>
                      Jhanda Chauraha, Mathura<br/>
                      Uttar Pradesh — 281001
                    </p>
                  </div>

                  {/* Contact */}
                  <div className="bg-[#f5f3ee] p-5 sm:p-6">
                    <p className="font-oswald text-[10px] tracking-[0.3em] uppercase text-[#7f7667] mb-4">Contact</p>
                    <div className="flex flex-col gap-3">
                      <a href="tel:+919837739595"
                        className="flex items-center gap-3 text-sm text-[#4e4639] hover:text-[#775a19] transition-colors"
                        style={{textDecoration:'none'}}>
                        <span className="material-symbols-outlined text-[#775a19] text-base"
                          style={{fontVariationSettings:"'FILL' 1"}}>call</span>
                        +91 98377 39595
                      </a>
                      <a href="mailto:aa.movies@gmail.com"
                        className="flex items-center gap-3 text-sm text-[#4e4639] hover:text-[#775a19] transition-colors"
                        style={{textDecoration:'none'}}>
                        <span className="material-symbols-outlined text-[#775a19] text-base"
                          style={{fontVariationSettings:"'FILL' 1"}}>mail</span>
                        aa.movies@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="bg-[#f5f3ee] p-5 sm:p-6">
                    <p className="font-oswald text-[10px] tracking-[0.3em] uppercase text-[#7f7667] mb-4">Studio Hours</p>
                    <div className="text-sm text-[#4e4639] space-y-1">
                      <div className="flex justify-between">
                        <span>Mon – Sat</span><span className="text-[#775a19]">10:00 – 19:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span><span className="text-[#775a19]">By Appointment</span>
                      </div>
                    </div>
                  </div>

                  {/* Socials */}
                  <div className="bg-[#f5f3ee] p-5 sm:p-6">
                    <p className="font-oswald text-[10px] tracking-[0.3em] uppercase text-[#7f7667] mb-4">Follow Us</p>
                    <div className="flex gap-3">
                      {[
                        {label:'Instagram', icon:'photo_camera', href:'https://instagram.com'},
                        {label:'Facebook',  icon:'thumb_up',     href:'https://facebook.com'},
                        {label:'YouTube',   icon:'play_circle',  href:'https://www.youtube.com/channel/UCN560mREywfAGih3Jhycwrg'},
                      ].map(({label,icon,href})=>(
                        <a key={label} href={href} target="_blank" rel="noreferrer"
                          className="w-11 h-11 flex items-center justify-center transition-all duration-300 hover:scale-110"
                          style={{border:'1px solid rgba(119,90,25,0.25)',textDecoration:'none'}}
                          onMouseEnter={e=>e.currentTarget.style.borderColor='#775a19'}
                          onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(119,90,25,0.25)'}
                          title={label}>
                          <span className="material-symbols-outlined text-sm text-[#775a19]"
                            style={{fontVariationSettings:"'FILL' 0, 'wght' 200"}}>{icon}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <p className="font-script text-[#775a19] text-right hidden sm:block"
                  style={{fontSize:'clamp(1.6rem,3vw,2.2rem)',lineHeight:'1.6'}}>
                  "Capturing the soul<br/>behind the light."
                </p>
              </div>
            </FadeRight>
          </div>
        </section>

        {/* ── CTA BAND ── */}
        <section className="bg-[#1b1c19] py-12 sm:py-16 px-4 sm:px-8 text-center">
          <FadeUp>
            <p className="font-oswald text-[10px] tracking-[0.5em] uppercase mb-4" style={{color:'#e9c176'}}>
              Ready to Begin?
            </p>
            <p className="font-unna text-[#fbf9f4] font-light mb-6"
              style={{fontSize:'clamp(1.4rem,4vw,2.2rem)'}}>
              Let's create something <span className="italic">timeless</span> together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919837739595"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 text-xs tracking-widest uppercase font-oswald font-semibold transition-all duration-300 hover:scale-[1.02]"
                style={{background:'linear-gradient(135deg,#ffdea5,#e9c176)',color:'#261900',textDecoration:'none'}}>
                <span className="material-symbols-outlined text-base"
                  style={{fontVariationSettings:"'FILL' 1"}}>call</span>
                Call Now
              </a>
              <Link to="/gallery"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 text-xs tracking-widest uppercase font-oswald font-semibold transition-all duration-300 hover:text-[#e9c176]"
                style={{border:'1px solid rgba(255,255,255,0.2)',color:'rgba(251,249,244,0.7)',textDecoration:'none'}}>
                View Our Work
              </Link>
            </div>
          </FadeUp>
        </section>
      </main>

      <Footer/>
    </div>
  )
}


