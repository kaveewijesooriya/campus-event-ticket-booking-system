import express from "express";

import {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
} from "../controllers/eventController.js";

const router = express.Router();

router.post("/create", createEvent);

router.get("/", getEvents);

router.put("/update/:id", updateEvent);

router.delete("/delete/:id", deleteEvent);

export default router;