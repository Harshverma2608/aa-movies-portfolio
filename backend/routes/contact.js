import { Router } from 'express'
import Contact from '../models/Contact.js'
import { sendContactEmail, sendAutoReply } from '../utils/mailer.js'

const router = Router()

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'Name, email and message are required.' })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' })
    }

    // Save to DB
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      subject: subject || 'General Enquiry',
      message: message.trim(),
    })

    // Send emails non-blocking — don't fail the request if email fails
    Promise.allSettled([
      sendContactEmail({ name, email, phone, subject, message }),
      sendAutoReply({ name, email, subject }),
    ]).then(results => {
      results.forEach((r, i) => {
        if (r.status === 'rejected') {
          console.error(`Email ${i === 0 ? 'admin' : 'auto-reply'} failed:`, r.reason?.message)
        }
      })
    })

    res.status(201).json({ success: true, id: contact._id })
  } catch (err) {
    console.error('Contact route error:', err)
    res.status(500).json({ error: 'Server error. Please try again.' })
  }
})

// GET /api/contact — admin view all enquiries
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
    const total = await Contact.countDocuments()
    res.json({ contacts, total, page: Number(page) })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

// DELETE /api/contact/:id — admin delete
router.delete('/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

export default router
