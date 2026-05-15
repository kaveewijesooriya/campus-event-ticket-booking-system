import express from "express";

import {
    createBooking,
    getBookings,
    deleteBooking
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createBooking);

router.get("/", protect, getBookings);

router.delete("/delete/:id", protect, deleteBooking);

export default router;