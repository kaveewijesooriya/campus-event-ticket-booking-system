import express from "express";

import {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
} from "../controllers/eventController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, authorizeRoles("organizer"), createEvent);

router.get("/", getEvents);

router.put("/update/:id", protect, authorizeRoles("organizer"), updateEvent);

router.delete("/delete/:id", protect, authorizeRoles("organizer"), deleteEvent);

export default router;