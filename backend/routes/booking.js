import { Router } from 'express'
import Booking from '../models/Booking.js'
import { sendBookingEmail } from '../utils/mailer.js'

const router = Router()

// POST /api/booking
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, eventType, eventDate, venue, message } = req.body
    if (!name || !email || !phone || !eventType || !eventDate) {
      return res.status(400).json({ error: 'Required fields missing.' })
    }

    const booking = await Booking.create({ name, email, phone, eventType, eventDate, venue, message })

    sendBookingEmail({ name, email, phone, eventType, eventDate, venue, message }).catch(console.error)

    res.status(201).json({ success: true, id: booking._id })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error. Please try again.' })
  }
})

// GET /api/booking  (admin use)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 })
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

// PATCH /api/booking/:id/status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!booking) return res.status(404).json({ error: 'Booking not found.' })
    res.json(booking)
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

export default router
