import mongoose from "mongoose";
const bookedSeat = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },customerEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  items: [{
    movieTitle: {type: String, required:true},
    showtime: {type:String, required:true},
    hall: {type: String, required: true},
    seats: [{
      id: { type: String, required: true },
      premium: { type: Boolean, default: false }
    }],
    total: { type: Number, required: true, min: 0 }
  }],
  total: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now }
});
const BookedSeat= mongoose.model("BookedSeat", bookedSeatSchema, "booked_seats");
export default BookedSeat;
