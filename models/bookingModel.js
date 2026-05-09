import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

    studentName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },

    packageType: {
        type: String,
        enum: ["Single", "Couple", "Group", "VIP"],
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    }

}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);