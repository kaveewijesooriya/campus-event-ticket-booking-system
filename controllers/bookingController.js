import Booking from "../models/bookingModel.js";
import Event from "../models/eventModel.js";

// Create Booking
export const createBooking = async (req, res) => {

    try {

        const {
            studentName,
            email,
            phone,
            eventId,
            packageType,
            quantity
        } = req.body;

        // Check event exists
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        // Check ticket availability
        if (event.availableTickets < quantity) {
            return res.status(400).json({
                message: "Not enough tickets available"
            });
        }

        // Calculate total price
        let totalPrice = 0;

        if (packageType === "VIP") {
            totalPrice = event.vipPrice * quantity;
        } else {
            totalPrice = event.ticketPrice * quantity;
        }

        // Create booking
        const booking = new Booking({
            studentName,
            email,
            phone,
            eventId,
            packageType,
            quantity,
            totalPrice
        });

        await booking.save();

        // Reduce available tickets
        event.availableTickets -= quantity;

        await event.save();

        res.status(201).json({
            message: "Ticket booked successfully",
            booking
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

// Get All Bookings
export const getBookings = async (req, res) => {

    try {

        const bookings = await Booking.find().populate("eventId");

        res.status(200).json(bookings);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

// Delete Booking
export const deleteBooking = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        await Booking.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Booking cancelled successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};