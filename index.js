import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import eventRoute from "./routes/eventRoute.js";
import bookingRoute from "./routes/bookingRoute.js";
import authRoute from "./routes/authRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/events", eventRoute);
app.use("/api/bookings", bookingRoute);

app.get("/", (req, res) => {
    res.send("Campus Event Ticket Booking System API Running");
});

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