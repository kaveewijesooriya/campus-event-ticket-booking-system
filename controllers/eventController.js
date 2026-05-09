import Event from "../models/eventModel.js";

// Create Event
export const createEvent = async (req, res) => {

    try {

        const event = new Event(req.body);

        await event.save();

        res.status(201).json({
            message: "Event Created Successfully",
            event
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

// Get All Events
export const getEvents = async (req, res) => {

    try {

        const events = await Event.find();

        res.status(200).json(events);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

// Update Event
export const updateEvent = async (req, res) => {

    try {

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedEvent);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

// Delete Event
export const deleteEvent = async (req, res) => {

    try {

        await Event.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Event Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};