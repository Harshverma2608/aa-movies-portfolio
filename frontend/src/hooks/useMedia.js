/**
 * useMedia.js
 * Serves images from /public/images/ and PDFs from /public/files/
 * as static URL strings — zero JS overhead, no glob scanning.
 *
 * HOW TO ADD NEW CONTENT:
 *   Images → drop into public/images/ → add entry to IMAGES below
 *   PDFs   → drop into public/files/  → add entry to PDFS below
 */

// ─── IMAGES ───────────────────────────────────────────────────────────────────
// Add new images here after dropping them into public/images/
const IMAGES = [
  { name: 'hero',  url: '/images/hero.jpg'  },
  { name: 'img2',  url: '/images/img2.jpg'  },
  { name: 'img3',  url: '/images/img3.jpg'  },
  { name: 'img4',  url: '/images/img4.jpg'  },
  { name: 'img5',  url: '/images/img5.jpg'  },
  { name: 'img6',  url: '/images/img6.jpg'  },
  { name: 'img7',  url: '/images/img7.JPG'  },
  { name: 'img8',  url: '/images/img8.JPG'  },
  { name: 'img9',  url: '/images/img9.JPG'  },
  { name: 'logo',  url: '/images/logo.png'  },
]

// ─── PDFs ─────────────────────────────────────────────────────────────────────
// Add new PDFs here after dropping them into public/files/
const PDFS = [
  { name: 'sky-wedding', url: '/files/sky-wedding.pdf', label: 'Sky Wedding' },
]

// ─── HOOKS ────────────────────────────────────────────────────────────────────
export function useImages() {
  return IMAGES.filter(i => i.name !== 'logo')
}

export function usePDFs() {
  return PDFS
}

export function getImage(name) {
  return IMAGES.find(i => i.name === name)?.url ?? null
}

// Named shortcuts — used directly in components
export const IMG = Object.fromEntries(IMAGES.map(i => [i.name, i.url]))
