import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home      from './pages/Home'
import Gallery   from './pages/Gallery'
import AboutUs   from './pages/AboutUs'
import Contact   from './pages/Contact'
import Offerings from './pages/Offerings'
import Packages  from './pages/Packages'
import Albums    from './pages/Albums'

const ease = [0.76, 0, 0.24, 1]

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <motion.div className="fixed inset-0 z-[9998] pointer-events-none origin-top"
        style={{ background: '#1b1c19' }}
        initial={{ scaleY: 1 }} animate={{ scaleY: 0 }}
        transition={{ duration: 0.65, ease }} />
      <motion.div className="fixed inset-0 z-[9997] pointer-events-none origin-bottom"
        style={{ background: '#1b1c19' }}
        initial={{ scaleY: 1 }} animate={{ scaleY: 0 }}
        transition={{ duration: 0.65, ease, delay: 0.05 }} />
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"          element={<PageWrapper><Home/></PageWrapper>}      />
        <Route path="/gallery"   element={<PageWrapper><Gallery/></PageWrapper>}   />
        <Route path="/offerings" element={<PageWrapper><Offerings/></PageWrapper>} />
        <Route path="/packages"  element={<PageWrapper><Packages/></PageWrapper>}  />
        <Route path="/albums"    element={<PageWrapper><Albums/></PageWrapper>}    />
        <Route path="/about"     element={<PageWrapper><AboutUs/></PageWrapper>}   />
        <Route path="/contact"   element={<PageWrapper><Contact/></PageWrapper>}   />
        {/* legacy */}
        <Route path="/services"  element={<PageWrapper><Offerings/></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}
