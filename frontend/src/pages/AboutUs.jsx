import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IMG } from '../hooks/useMedia'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const team = [
  { name: 'Arjun Sharma', role: 'Founder & Lead Photographer', img: IMG.img2, bio: 'With a background in fine arts, Arjun views every frame as a canvas for light and shadow. 12 years behind the lens.' },
  { name: 'Ananya Gupta', role: 'Editorial Director',          img: IMG.img3, bio: 'Ananya specializes in narrative pacing, ensuring your final gallery tells a cohesive, cinematic story.' },
  { name: 'Vikram Mehta', role: 'Lead Cinematographer',        img: IMG.img4, bio: 'Vikram captures the rhythm of life through motion, creating films that feel like living memories.' },
]

const steps = [
  { num: '01', title: 'The Discovery', body: 'We begin with a deep conversation. Understanding your values and your story is the foundation of our visual narrative.' },
  { num: '02', title: 'The Event',     body: 'On the day, we are intentional but unobtrusive. We focus on candid interactions and the architectural beauty of your setting.' },
  { num: '03', title: 'The Curation', body: 'Each image is hand-polished in our studio to ensure the color and tone match the timeless editorial aesthetic of A&A Movies.' },
]

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

export default function AboutUs() {
  useReveal()
  return (
    <div className="bg-[#fbf9f4] text-[#1b1c19]">
      <Navbar />

      {/* HERO */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <img src={IMG.img5} alt="About" className="absolute inset-0 w-full h-full object-cover animate-slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block" style={{ animation: 'lensFocus 10s ease-in-out infinite' }}>
          <svg width="300" height="300" viewBox="0 0 300 300">
            {[140,110,80,50,20].map((r,i) => <circle key={i} cx="150" cy="150" r={r} stroke="#e9c176" strokeWidth="0.5" fill="none" strokeDasharray={i%2===0?'none':'3 5'} />)}
            {[0,45,90,135,180,225,270,315].map((deg,i) => (
              <line key={i} x1={150+60*Math.cos(deg*Math.PI/180)} y1={150+60*Math.sin(deg*Math.PI/180)} x2={150+80*Math.cos(deg*Math.PI/180)} y2={150+80*Math.sin(deg*Math.PI/180)} stroke="#e9c176" strokeWidth="0.5" />
            ))}
          </svg>
        </div>
        <div className="relative z-10 px-12 max-w-7xl mx-auto w-full">
          <p className="animate-fade-up text-[10px] tracking-[0.5em] uppercase mb-6" style={{ color: '#e9c176' }}>Our Essence</p>
          <h1 className="animate-fade-up-delay font-[Noto_Serif] text-6xl md:text-8xl leading-[1.05] font-light mb-8 italic text-[#fbf9f4]">
            Capturing the <br />Quiet Moments
          </h1>
          <p className="animate-fade-up-delay2 text-lg opacity-75 max-w-md leading-relaxed text-[#fbf9f4]">
            We believe photography is not about grand gestures, but the subtle, honest connections that happen in the margins of life.
          </p>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="bg-[#f5f3ee] py-32 px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-24 reveal">
          <div className="md:w-1/3">
            <div className="aperture-ring animate-lens-focus mb-8">
              <span className="material-symbols-outlined text-[#775a19] text-3xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 100" }}>photo_camera</span>
            </div>
            <h2 className="font-[Noto_Serif] text-4xl font-light leading-tight">The Philosophy<br />of Time</h2>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-16">
            {[
              { label: 'Experience', title: 'A Decade of Vision',    body: 'With over ten years behind the lens, we have learned that the best shots are never staged. They are observed.' },
              { label: 'Emotion',    title: 'The Feel of a Frame',   body: "Our work is defined by emotional resonance. We document how it felt to be there, in that specific light, at that exact moment." },
              { label: 'Craft',      title: 'Film & Digital',        body: 'We shoot medium-format film alongside digital capture, blending chemical depth with modern precision.' },
              { label: 'Approach',   title: 'Unobtrusive Presence',  body: 'We are guests at your event, not directors. Our presence is felt only in the images — never in the moment itself.' },
            ].map((item, i) => (
              <div key={i} className={`reveal reveal-delay-${(i%3)+1}`}>
                <span className="text-[10px] tracking-widest uppercase text-[#7f7667] mb-4 block">{item.label}</span>
                <h3 className="font-[Noto_Serif] text-xl mb-4">{item.title}</h3>
                <p className="text-[#4e4639] leading-relaxed text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="py-32 px-12 bg-[#fbf9f4]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 reveal">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#775a19] mb-4">How We Work</p>
            <h2 className="font-[Noto_Serif] text-5xl font-light">The A&amp;A Approach</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {steps.map((s, i) => (
              <div key={i} className={`md:col-span-4 bg-white p-12 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(27,28,25,0.06)] reveal reveal-delay-${i+1}`}>
                <span className="font-[Noto_Serif] text-5xl italic mb-8 block" style={{ color: '#e9c176' }}>{s.num}</span>
                <h3 className="font-[Noto_Serif] text-2xl mb-4">{s.title}</h3>
                <p className="text-[#4e4639] text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
            <div className="md:col-span-8 overflow-hidden reveal" style={{ minHeight: '280px' }}>
              <img src={IMG.img4} alt="Event" className="w-full h-full object-cover" style={{ filter: 'grayscale(30%)' }} />
            </div>
            <div className="md:col-span-4 overflow-hidden reveal reveal-delay-1" style={{ minHeight: '280px' }}>
              <img src={IMG.img3} alt="Camera" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-32 px-12 bg-[#f0eee9]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 reveal">
            <div className="max-w-xl">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#775a19] mb-4">The Artisans</p>
              <h2 className="font-[Noto_Serif] text-5xl font-light">The Minds Behind the Lens</h2>
            </div>
            <p className="font-[Noto_Serif] text-[#4e4639] text-sm italic mt-8 md:mt-0">A collective of visionaries dedicated to the art of seeing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, i) => (
              <div key={i} className={`group reveal reveal-delay-${i+1}`}>
                <div className="aspect-[3/4] overflow-hidden mb-6 bg-[#fbf9f4] relative img-loupe">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(119,90,25,0.3), transparent)' }} />
                </div>
                <h3 className="font-[Noto_Serif] text-xl">{member.name}</h3>
                <span className="text-[10px] tracking-widest uppercase text-[#7f7667] block mb-3">{member.role}</span>
                <p className="text-sm text-[#4e4639] leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DARK QUOTE */}
      <section className="py-24 px-12 bg-[#1b1c19] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none flex items-center justify-center">
          <svg width="500" height="500" viewBox="0 0 500 500">
            {[220,170,120,70].map((r,i) => <circle key={i} cx="250" cy="250" r={r} stroke="#e9c176" strokeWidth="1" fill="none" />)}
          </svg>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto reveal">
          <span className="material-symbols-outlined text-5xl mb-6 block" style={{ color: '#e9c176', fontVariationSettings: "'FILL' 1" }}>format_quote</span>
          <p className="font-[Noto_Serif] text-3xl italic font-light leading-relaxed text-[#fbf9f4]">
            "We don't take photographs. We make them — one deliberate frame at a time."
          </p>
          <div className="w-12 h-px mx-auto mt-8" style={{ background: '#e9c176' }} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 px-12 text-center bg-[#fbf9f4] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <svg width="600" height="600" viewBox="0 0 600 600">
            {[260,210,160,110,60].map((r,i) => <circle key={i} cx="300" cy="300" r={r} stroke="#775a19" strokeWidth="1" fill="none" strokeDasharray={i%2===0?'none':'4 8'} />)}
          </svg>
        </div>
        <div className="max-w-3xl mx-auto relative z-10 reveal">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#775a19] mb-12">Start Your Story</p>
          <h2 className="font-[Noto_Serif] text-6xl font-light mb-12 italic">Shall we create something timeless?</h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link to="/contact">
              <button className="gold-gradient text-[#261900] px-12 py-5 text-xs tracking-widest uppercase font-bold rounded-sm shadow-[0_20px_40px_rgba(119,90,25,0.2)] hover:scale-[1.02] transition-transform duration-500 animate-gold-pulse">
                Inquire Now
              </button>
            </Link>
            <Link to="/gallery">
              <button className="text-[#1b1c19] px-12 py-5 text-xs tracking-widest uppercase hover:text-[#775a19] transition-all" style={{ borderBottom: '1px solid #1b1c19' }}>
                View The Gallery
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

