import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  items: [{
    movieID: { type: String, required: true },
    timeSlot: { type: String, required: true },
    seats: [{
      id: { type: String, required: true },
      premium: { type: Boolean, default: false }
    }],
    total: { type: Number, required: true, min: 0 }
  }],
  total: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", bookingSchema, "bookings");

export default Booking;