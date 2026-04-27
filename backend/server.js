import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import contactRoutes from './routes/contact.js'
import bookingRoutes from './routes/booking.js'

const app = express()
const PORT = process.env.PORT || 5000

// CORS — allow both local dev and production frontend
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.CLIENT_URL,           // e.g. https://aa-movies.vercel.app
  process.env.CLIENT_URL_2,         // optional second domain
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error(`CORS blocked: ${origin}`))
  },
  credentials: true,
}))

app.use(express.json({ limit: '10kb' }))

// Security headers
app.use((_, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  next()
})

// Routes
app.use('/api/contact', contactRoutes)
app.use('/api/booking', bookingRoutes)

// Health check — Vercel/Railway ping this
app.get('/api/health', (_, res) => res.json({
  status: 'ok',
  timestamp: new Date().toISOString(),
  env: process.env.NODE_ENV || 'development',
}))

// 404 handler
app.use((_, res) => res.status(404).json({ error: 'Route not found' }))

// Error handler
app.use((err, _, res, __) => {
  console.error(err.message)
  res.status(500).json({ error: 'Internal server error' })
})

// Connect DB & start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
  })
  .catch(err => {
    console.error('❌ DB connection failed:', err.message)
    process.exit(1)
  })
