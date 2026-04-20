import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import contactRoutes from './routes/contact.js'
import bookingRoutes from './routes/booking.js'

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

// Routes
app.use('/api/contact', contactRoutes)
app.use('/api/booking', bookingRoutes)

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

// Connect DB & start server
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/aamovies')
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
  })
  .catch(err => {
    console.error('DB connection failed:', err.message)
    process.exit(1)
  })
