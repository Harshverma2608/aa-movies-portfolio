import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FadeUp, StaggerContainer, StaggerItem, ClipReveal, ScrollProgressBar } from '../components/AnimatedSection'
import { useImages, usePDFs, IMG } from '../hooks/useMedia'

const E = [0.16, 1, 0.3, 1]
const CATS = ['All', 'Weddings', 'Pre-Wedding', 'Events', 'Portraits']

export default function Gallery() {
  const allImages = useImages()
  const allPDFs   = usePDFs()

  // Build gallery items from all images (excluding logo)
  const galleryImages = allImages.filter(i => !i.name.includes('logo'))

  // Assign categories cyclically so new images auto-get a category
  const catCycle = ['Weddings','Pre-Wedding','Events','Portraits','Weddings','Pre-Wedding','Events','Portraits','Weddings']
  const galleryItems = galleryImages.map((img, i) => ({
    ...img,
    category: catCycle[i % catCycle.length],
    title: img.name.replace(/img/i,'').replace(/\d+/,'').trim() || `Frame ${i+1}`,
  }))

  const [active, setActive]   = useState('All')
  const [slide, setSlide]     = useState(0)
  const [fading, setFading]   = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const touchStartX = useRef(null)

  const filtered = active === 'All' ? galleryItems : galleryItems.filter(i => i.category === active)
  const slides   = galleryImages.map(i => i.url)

  function changeSlide(i) {
    setFading(true)
    setTimeout(()=>{ setSlide(i); setFading(false) }, 300)
  }
  function next() { changeSlide((slide+1)%slides.length) }
  function prev() { changeSlide((slide-1+slides.length)%slides.length) }

  // Touch swipe support
  function onTouchStart(e) { touchStartX.current = e.touches[0].clientX }
  function onTouchEnd(e) {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    touchStartX.current = null
  }

  useEffect(()=>{
    const t = setInterval(next, 4500)
    return()=>clearInterval(t)
  },[slide, slides.length])

  return (
    <div className="bg-[#fbf9f4] text-[#1b1c19]">
      <ScrollProgressBar/>
      <Navbar/>

      {/* ── HERO ── */}
      <section className="relative flex items-end overflow-hidden" style={{minHeight:'clamp(280px,50vh,60vh)',paddingTop:'72px'}}>
        <img src={IMG.hero} alt="Gallery"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager" fetchPriority="high" width="1920" height="1080"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/80"/>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-8 sm:pb-14">
          <p className="animate-fade-up font-oswald text-[10px] tracking-[0.5em] uppercase mb-3" style={{color:'#e9c176'}}>
            The Curated Archive
          </p>
          <h1 className="animate-fade-up-delay font-unna font-light text-[#fbf9f4] leading-tight"
            style={{fontSize:'clamp(2rem,6vw,4.5rem)'}}>
            Visual Narratives
          </h1>
          <p className="animate-fade-up-delay2 text-sm text-[#fbf9f4] opacity-70 mt-2 max-w-lg">
            {galleryImages.length} frames — a timeless collection of human connection.
          </p>
        </div>
      </section>

      <main className="pb-24">

        {/* ── FILTER ── */}
        <section className="px-6 sm:px-12 py-10 max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 sm:gap-8 items-center justify-between">
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {CATS.map(cat=>(
                <button key={cat} onClick={()=>setActive(cat)}
                  className="relative text-[11px] tracking-[0.2em] uppercase pb-1 transition-all duration-300"
                  style={{color:active===cat?'#775a19':'#4e4639'}}>
                  {cat}
                  <motion.span className="absolute bottom-0 left-0 h-px transition-all duration-400"
                    style={{background:'#775a19'}}
                    initial={false} animate={{width:active===cat?'100%':'0%'}}
                    transition={{duration:0.35,ease:E}}/>
                </button>
              ))}
            </div>
            <p className="text-[10px] tracking-widest uppercase text-[#7f7667]">
              {filtered.length} {filtered.length===1?'image':'images'}
            </p>
          </div>
        </section>

        {/* ── MASONRY GRID ── */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={active} className="masonry-grid"
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              transition={{duration:0.35,ease:E}}>
              {filtered.map((item,i)=>(
                <div
                  key={`${active}-${i}`}
                  className={`${i%5===0?'gallery-item-tall':i%3===0?'gallery-item-wide':'gallery-item'} group`}
                  onClick={()=>setLightbox(item.url)}>
                  <img
                    src={item.url}
                    alt={item.category}
                    loading={i < 6 ? 'eager' : 'lazy'}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4 pointer-events-none">
                    <span className="font-oswald text-[10px] tracking-[0.2em] uppercase" style={{color:'#e9c176'}}>{item.category}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* ── LIGHTBOX ── */}
        <AnimatePresence>
          {lightbox && (
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
              style={{background:'rgba(27,28,25,0.96)'}}
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              onClick={()=>setLightbox(null)}>
              <motion.img src={lightbox} alt="Preview"
                className="max-w-full max-h-full object-contain"
                initial={{scale:0.88,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.88,opacity:0}}
                transition={{duration:0.4,ease:E}} onClick={e=>e.stopPropagation()}/>
              <button className="absolute top-5 right-6 text-white opacity-60 hover:opacity-100 transition-opacity"
                onClick={()=>setLightbox(null)}>
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SLIDER ── */}
        <section className="mt-20 sm:mt-28 px-6 sm:px-12 max-w-7xl mx-auto">
          <FadeUp className="mb-8">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#775a19] mb-2">Featured Work</p>
            <h3 className="font-[Noto_Serif] text-3xl sm:text-4xl font-light">The Signature Series</h3>
          </FadeUp>
          <div className="relative overflow-hidden"
            onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div className="relative">
              <img src={slides[slide]} alt="slide"
                className="w-full object-cover transition-opacity duration-500"
                loading="lazy"
                style={{maxHeight:'clamp(300px,55vw,600px)',opacity:fading?0:1}}/>
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="scan-line"/>
              </div>
              <div className="absolute bottom-4 right-4 text-white text-xs tracking-widest bg-black/40 px-3 py-1">
                {String(slide+1).padStart(2,'0')} / {String(slides.length).padStart(2,'0')}
              </div>
            </div>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{background:'rgba(27,28,25,0.5)',backdropFilter:'blur(8px)'}}>
              <span className="material-symbols-outlined text-white">chevron_left</span>
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{background:'rgba(27,28,25,0.5)',backdropFilter:'blur(8px)'}}>
              <span className="material-symbols-outlined text-white">chevron_right</span>
            </button>
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {slides.map((src,i)=>(
              <button key={i} onClick={()=>changeSlide(i)}
                className="flex-shrink-0 overflow-hidden transition-all duration-300"
                style={{width:'72px',height:'48px',opacity:i===slide?1:0.35,outline:i===slide?'1px solid #775a19':'none',outlineOffset:'2px'}}>
                <img src={src} alt="" className="w-full h-full object-cover object-center"/>
              </button>
            ))}
          </div>
        </section>

        {/* ── VIDEO ── */}
        <section className="mt-20 sm:mt-28 bg-[#1b1c19] text-white py-16 sm:py-24 px-6 sm:px-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
            <svg width="500" height="500" viewBox="0 0 500 500">
              {[220,170,120,70].map((r,i)=><circle key={i} cx="250" cy="250" r={r} stroke="#e9c176" strokeWidth="1" fill="none"/>)}
            </svg>
          </div>
          <FadeUp className="relative z-10">
            <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{color:'#e9c176'}}>Cinematic</p>
            <h3 className="font-[Noto_Serif] text-3xl sm:text-4xl font-light mb-10">Featured Film</h3>
            <div className="flex justify-center">
              <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                className="w-full max-w-4xl border-0" style={{height:'clamp(220px,45vw,450px)'}}
                frameBorder="0" allowFullScreen title="Wedding Film"/>
            </div>
            <h4 className="font-[Noto_Serif] text-xl sm:text-2xl font-light mt-8">Grand Wedding @ Le Meridien, Jaipur</h4>
            <p className="mt-3 max-w-xl mx-auto text-sm" style={{color:'#d1c5b4'}}>
              Ayush and Diksha — a journey of love and happiness, preserved forever.
            </p>
          </FadeUp>
        </section>

        {/* ── DOWNLOADS — auto from /public/files/ ── */}
        {allPDFs.length > 0 && (
          <section className="py-16 sm:py-24 px-6 sm:px-12 max-w-7xl mx-auto">
            <FadeUp className="mb-10">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#775a19] mb-2">Resources</p>
              <h3 className="font-[Noto_Serif] text-3xl sm:text-4xl font-light">Downloads</h3>
              <p className="text-[#4e4639] text-sm mt-2">
                Drop any PDF into <code className="bg-[#f5f3ee] px-1 text-xs">public/files/</code> — it appears here automatically.
              </p>
            </FadeUp>
            {allPDFs.map((pdf,i)=>(
              <motion.div key={i} className="group flex justify-between items-center py-5 px-4 -mx-4 transition-colors duration-300 hover:bg-[#f5f3ee]"
                style={{borderBottom:'1px solid rgba(209,197,180,0.25)'}}
                initial={{opacity:0,x:-16}} whileInView={{opacity:1,x:0}}
                transition={{duration:0.5,delay:i*0.08,ease:E}} viewport={{once:true}}>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#775a19] opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{fontVariationSettings:"'FILL' 0, 'wght' 200"}}>picture_as_pdf</span>
                  <div>
                    <p className="text-sm tracking-widest uppercase text-[#1b1c19]">{pdf.label}</p>
                    <p className="text-[10px] text-[#7f7667] mt-0.5">PDF Document</p>
                  </div>
                </div>
                <a href={pdf.url} target="_blank" rel="noreferrer"
                  className="text-[10px] tracking-widest uppercase pb-1 hover:text-[#775a19] transition-all"
                  style={{borderBottom:'1px solid #1b1c19'}}>
                  Download
                </a>
              </motion.div>
            ))}
          </section>
        )}

        {/* ── PDF VIEWER ── */}
        {allPDFs.length > 0 && (
          <section className="py-16 sm:py-20 px-6 sm:px-12 bg-[#f5f3ee] text-center">
            <FadeUp>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#775a19] mb-2">Preview</p>
              <h3 className="font-[Noto_Serif] text-3xl sm:text-4xl font-light mb-8">Album Preview</h3>
              <a href={allPDFs[0].url} target="_blank" rel="noreferrer"
                className="inline-block mb-8 text-xs tracking-widest uppercase pb-1 hover:text-[#775a19] transition-all"
                style={{borderBottom:'1px solid #1b1c19'}}>
                Download PDF →
              </a>
              <div className="flex justify-center">
                <iframe src={allPDFs[0].url} title="PDF Viewer"
                  className="w-full max-w-4xl border-0" style={{height:'clamp(300px,60vw,600px)'}}/>
              </div>
            </FadeUp>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="py-24 sm:py-32 px-6 sm:px-12 text-center bg-[#fbf9f4] relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <svg width="500" height="500" viewBox="0 0 500 500">
              {[200,160,120,80].map((r,i)=><circle key={i} cx="250" cy="250" r={r} stroke="#775a19" strokeWidth="1" fill="none" strokeDasharray={i%2===0?'none':'4 8'}/>)}
            </svg>
          </div>
          <FadeUp className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-[Noto_Serif] text-3xl sm:text-5xl font-light mb-8">Ready to Capture Your Story?</h2>
            <p className="text-[#4e4639] max-w-xl mx-auto mb-10 text-sm sm:text-base">
              We accept a limited number of commissions each year to ensure every client receives our full creative focus.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <motion.button className="gold-gradient text-[#261900] px-10 py-4 text-xs tracking-[0.2em] uppercase font-bold rounded-sm"
                  style={{boxShadow:'0 20px 40px rgba(119,90,25,0.15)'}}
                  whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                  transition={{type:'spring',stiffness:300,damping:20}}>
                  Check Availability
                </motion.button>
              </Link>
              <Link to="/offerings">
                <motion.button className="text-[#1b1c19] px-10 py-4 text-xs tracking-widest uppercase hover:text-[#775a19] transition-all"
                  style={{borderBottom:'1px solid #1b1c19'}}
                  whileHover={{borderBottomColor:'#775a19'}}>
                  View Services
                </motion.button>
              </Link>
            </div>
          </FadeUp>
        </section>
      </main>

      <Footer/>
    </div>
  )
}


