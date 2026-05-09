import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    time: {
        type: String,
        required: true
    },

    venue: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    ticketPrice: {
        type: Number,
        required: true
    },

    vipPrice: {
        type: Number,
        required: true
    },

    availableTickets: {
        type: Number,
        required: true
    }

});

export default mongoose.model("Event", eventSchema);