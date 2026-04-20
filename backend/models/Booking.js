import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  email:       { type: String, required: true, trim: true, lowercase: true },
  phone:       { type: String, required: true },
  eventType:   { type: String, required: true },
  eventDate:   { type: Date, required: true },
  venue:       { type: String },
  message:     { type: String },
  status:      { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
}, { timestamps: true })

export default mongoose.model('Booking', bookingSchema)
