import Booking from "../models/bookingModel.js";

// Create Booking
export const createBooking = async (req, res) => {

    try {

        const booking = new Booking(req.body);

        await booking.save();

        res.status(201).json({
            message: "Ticket Booked Successfully",
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

        await Booking.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Booking Cancelled Successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};