import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test Route
app.get("/", (req, res) => {
    res.send("Campus Event Ticket Booking System API Running");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
.then(() => {

    console.log("MongoDB Connected Successfully");

    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });

})
.catch((error) => {
    console.log(error);
});