import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Booking from "../models/booking.js";

const app = express();

// 1. Move CORS and express.json to the very top so they apply to all routes
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const movieSchema = new mongoose.Schema({}, {
  strict: false,
  collection: "movies"
});

const Movie = mongoose.model("Movie", movieSchema);

app.use((req, res, next) => {
  console.log("REQUEST REACHED EXPRESS:", req.method, req.url);
  next();
});

app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movie.find().lean();
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

app.post("/api/booked_seats", async (req, res) => {
  console.log("--> POST /api/booked_seats with information:", req.body);
  try {
    const { name, email, total, cart } = req.body;
    
    console.log("Mapping cart items...");
    const finalItems = cart.map((item) => ({
      movieID: item.movie.id,
      timeSlot: item.time.time,
      seats: item.seats,
      total: item.total
    }));

    console.log("Creating new Booking model...");
    const newBooking = new Booking({
      customerName: name,
      customerEmail: email,  
      items: finalItems,
      total: total
    });

    console.log("Saving booking to MongoDB...");
    await newBooking.save();
    console.log("SUCCESS: Booking saved with ID:", newBooking._id);
    
    res.status(201).json({ message: "Booking saved successfully!", bookingId: newBooking._id });
  } catch (error) {
    console.error("ERROR caught inside POST /api/booked_seats:", error);
    res.status(500).json({ error: "Failed to process booking" });
  }
});

app.get("/api/booked_seats", async (req, res) => {
  try{
    const BookedSeats =await Booking.find();
    res.json(BookedSeats);
  }
  catch(error){
    console.error("Unable to fetch booked seats details", error);
    res.status(500).json({error:"Failed to fetch booked seats details"});
  }
});

async function startServer() {
  try {
    // 2. Connect once with the correct database name specified inside options or URI
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "movies"
    });
    console.log("MongoDB connected!");

    // 3. Match backend port to what your frontend expects
    app.listen(5001, () => {
      console.log("Server running on port 5001");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();