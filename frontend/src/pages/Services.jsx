import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { IMG } from '../hooks/useMedia'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// A&A Movies YouTube channel ID
const YT_CHANNEL_ID = 'UCN560mREywfAGih3Jhycwrg'

// Hardcoded known video IDs from the channel as fallback
// Replace with real IDs from https://youtube.com/@aamovies5213
const FALLBACK_VIDEOS = [
  { id: 'dQw4w9WgXcQ', title: 'Grand Wedding Film', category: 'Wedding' },
  { id: 'dQw4w9WgXcQ', title: 'Pre-Wedding Shoot', category: 'Pre-Wedding' },
  { id: 'dQw4w9WgXcQ', title: 'Cinematic Highlights', category: 'Highlights' },
]

const services = [
  {
    collection: 'Collection I',
    title: 'The Wedding Monograph',
    subtitle: 'A Story in Motion',
    description: `In the quiet corners of Jaipur's grand palaces, where the architecture whispers centuries of heritage, we capture a story that feels less like a day and more like a lifetime. The Monograph is our signature approach — an editorial synthesis of motion and still imagery designed to preserve the visceral feeling of the moment.`,
    detail: `This project is defined by its intimacy. Our focus is not merely on the ceremony, but the stolen glances, the texture of the bridal lehenga, and the way light dances across the marble terrace at the stroke of golden hour.`,
    images: [IMG.img2, IMG.img3, IMG.img4, IMG.img5, IMG.img6],
    heroImg: IMG.hero,
    tag: 'Weddings',
  },
  {
    collection: 'Collection II',
    title: 'The Pre-Wedding Edit',
    subtitle: 'Before Forever',
    description: `A pre-wedding session is not a rehearsal — it is its own story. We scout locations that carry meaning, craft light that flatters, and create an atmosphere where two people forget the camera exists entirely.`,
    detail: `From the golden wheat fields of Rajasthan to the misty ghats of Varanasi, every location becomes a canvas. We bring the same editorial rigour to your pre-wedding as we do to the ceremony itself.`,
    images: [IMG.img3, IMG.img4, IMG.img5, IMG.img6, IMG.img2],
    heroImg: IMG.img3,
    tag: 'Pre-Wedding',
  },
  {
    collection: 'Collection III',
    title: 'The Portrait Session',
    subtitle: 'The Heritage Series',
    description: `A portrait is an act of preservation. We work with natural light and architectural spaces to create images that feel timeless — photographs that belong in a frame on a wall, not lost in a phone gallery.`,
    detail: `Our portrait sessions are unhurried. We spend time understanding who you are before we ever raise the camera. The result is an image that feels like you, at your most authentic.`,
    images: [IMG.img5, IMG.img6, IMG.img2, IMG.img3, IMG.img4],
    heroImg: IMG.img5,
    tag: 'Portraits',
  },
]

// YouTube embed component — uses nocookie domain for privacy
function YouTubeSection() {
  const [videos, setVideos] = useState(FALLBACK_VIDEOS)
  const [active, setActive] = useState(0)
  const [apiLoaded, setApiLoaded] = useState(false)

  useEffect(() => {
    // Try YouTube Data API v3 if key is available in env
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
    if (!apiKey) return

    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${YT_CHANNEL_ID}&part=snippet&order=date&maxResults=6&type=video`
    )
      .then(r => r.json())
      .then(data => {
        if (data.items?.length) {
          setVideos(
            data.items.map(item => ({
              id: item.id.videoId,
              title: item.snippet.title,
              category: item.snippet.channelTitle,
              thumb: item.snippet.thumbnails?.medium?.url,
            }))
          )
          setApiLoaded(true)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section className="py-32 px-12 bg-[#f5f3ee]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#775a19] mb-4 block">Cinematic</span>
          <h2 className="font-[Noto_Serif] text-5xl font-light">Featured Films</h2>
          <p className="text-[#4e4639] mt-4 max-w-lg">
            Watch our latest work directly from the studio. Every film is a complete narrative — not a highlight reel.
          </p>
        </div>

        {/* Main player */}
        <div className="w-full aspect-video bg-[#1b1c19] mb-8">
          <iframe
            key={videos[active]?.id}
            src={`https://www.youtube-nocookie.com/embed/${videos[active]?.id}?rel=0&modestbranding=1`}
            title={videos[active]?.title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video selector row */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {videos.map((v, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 text-left transition-all duration-300 ${
                i === active ? 'opacity-100' : 'opacity-40 hover:opacity-70'
              }`}
            >
              {v.thumb ? (
                <img src={v.thumb} alt={v.title} className="w-40 h-24 object-cover mb-2" />
              ) : (
                <div className="w-40 h-24 bg-[#e4e2dd] flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-[#775a19]">play_circle</span>
                </div>
              )}
              <p className="text-[10px] tracking-[0.15em] uppercase text-[#775a19] mb-1">{v.category}</p>
              <p className="text-xs font-[Noto_Serif] text-[#1b1c19] leading-snug max-w-[160px] line-clamp-2">{v.title}</p>
            </button>
          ))}
        </div>

        <div className="mt-8">
          <a
            href={`https://www.youtube.com/channel/${YT_CHANNEL_ID}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 text-xs tracking-widest uppercase border-b border-[#1b1c19] pb-1 hover:text-[#775a19] hover:border-[#775a19] transition-all"
          >
            <span className="material-symbols-outlined text-base">play_circle</span>
            View Full Channel
          </a>
        </div>
      </div>
    </section>
  )
}

// Single service section — matches the screenshot layout exactly
function ServiceBlock({ service, index }) {
  const isEven = index % 2 === 0
  const [imgs] = useState(service.images)

  return (
    <article className="relative">
      {/* Full-bleed hero */}
      <div className="relative h-screen w-full overflow-hidden">
        <img
          src={service.heroImg}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#fbf9f4] px-4">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#e9c176] mb-6 block">
            {service.collection}
          </span>
          <h2 className="font-[Noto_Serif] text-6xl md:text-8xl font-light leading-tight mb-4">
            {service.title}
          </h2>
          <p className="font-[Noto_Serif] italic text-2xl opacity-80">{service.subtitle}</p>
          <div className="mt-12">
            <span className="material-symbols-outlined text-4xl animate-bounce opacity-70">
              keyboard_double_arrow_down
            </span>
          </div>
        </div>
      </div>

      {/* Narrative section */}
      <div className={`py-32 px-12 ${index % 2 === 0 ? 'bg-[#fbf9f4]' : 'bg-[#f5f3ee]'}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-start">

          {/* Text — asymmetric offset */}
          <div className={`md:col-span-5 ${isEven ? 'md:col-start-1' : 'md:col-start-8 md:row-start-1'}`}>
            <h3 className="font-[Noto_Serif] text-4xl font-light leading-tight mb-8">
              The Curated<br />Narrative
            </h3>
            <p className="text-[#4e4639] leading-relaxed text-lg mb-6">{service.description}</p>
            <p className="text-[#4e4639] leading-relaxed text-lg mb-10">{service.detail}</p>
            <a
              href="#film"
              className="text-xs tracking-widest uppercase border-b border-[#1b1c19] pb-1 hover:text-[#775a19] hover:border-[#775a19] transition-all"
            >
              View the film
            </a>
          </div>

          {/* Large image — offset opposite side */}
          <div className={`md:col-span-6 ${isEven ? 'md:col-start-7' : 'md:col-start-1 md:row-start-1'}`}>
            <img
              src={imgs[0]}
              alt={service.title}
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Detail focus — asymmetric photo grid */}
      <div className={`py-16 px-12 ${index % 2 === 0 ? 'bg-[#f5f3ee]' : 'bg-[#fbf9f4]'}`}>
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#7f7667] mb-12 block">
            Detail Focus: Artisanal Elements
          </span>

          {/* Intentionally asymmetric bento grid */}
          <div className="grid grid-cols-12 grid-rows-2 gap-4 h-[600px]">
            <div className="col-span-5 row-span-2 overflow-hidden">
              <img src={imgs[1]} alt="" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            <div className="col-span-4 row-span-1 overflow-hidden">
              <img src={imgs[2]} alt="" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            <div className="col-span-3 row-span-1 overflow-hidden">
              <img src={imgs[3]} alt="" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            <div className="col-span-7 row-span-1 overflow-hidden">
              <img src={imgs[4]} alt="" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Services() {
  return (
    <div className="bg-[#fbf9f4] text-[#1b1c19]">
      <Navbar />

      {/* Page hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <img src={IMG.hero} alt="Services" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#fbf9f4] px-4">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#e9c176] mb-6 block">
            The Studio
          </span>
          <h1 className="font-[Noto_Serif] text-6xl md:text-8xl font-light leading-tight mb-6">
            Our Services
          </h1>
          <p className="text-lg tracking-[0.08em] opacity-80 max-w-xl">
            Each commission is a bespoke collaboration. We offer three distinct approaches to visual storytelling.
          </p>
        </div>
      </section>

      {/* Service blocks */}
      {services.map((service, i) => (
        <ServiceBlock key={i} service={service} index={i} />
      ))}

      {/* Quote */}
      <section className="py-32 bg-[#fbf9f4] overflow-hidden">
        <div className="max-w-4xl mx-auto px-12 text-center">
          <span
            className="material-symbols-outlined text-[#775a19] text-5xl mb-8 block"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            format_quote
          </span>
          <p className="font-[Noto_Serif] text-3xl md:text-4xl italic font-light leading-relaxed mb-12 text-[#1b1c19]">
            "Photography is not about what we see, but the feeling we carry forward into the forever."
          </p>
          <div className="flex flex-col items-center">
            <div className="w-16 h-px bg-[#d1c5b4] mb-4" />
            <p className="text-sm tracking-[0.3em] uppercase">Arjun Sharma, Principal Artist</p>
            <p className="text-xs text-[#4e4639] mt-1">A&A Movies Studio</p>
          </div>
        </div>
      </section>

      {/* YouTube section */}
      <YouTubeSection />

      {/* CTA */}
      <section className="py-40 px-12 text-center bg-[#fbf9f4]">
        <span className="text-[10px] tracking-[0.5em] uppercase text-[#775a19] mb-12 block">
          Craft Your Own Monograph
        </span>
        <h2 className="font-[Noto_Serif] text-5xl md:text-6xl font-light mb-16">
          Let's begin your story.
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/contact">
            <button className="gold-gradient text-[#261900] px-12 py-5 text-xs tracking-[0.3em] uppercase font-bold rounded-sm shadow-xl hover:scale-[1.02] transition-transform duration-500">
              Inquire About This Service
            </button>
          </Link>
          <Link to="/gallery">
            <button className="border-b border-[#1b1c19] text-[#1b1c19] px-12 py-5 text-xs tracking-widest uppercase hover:text-[#775a19] hover:border-[#775a19] transition-all">
              View More Projects
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

