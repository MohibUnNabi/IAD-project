import mongoose from "mongoose";

const GuestSpeakerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        designation: { type: String, required: true },
        time_slots: { type: Date, default: Date.now, required: true },
        topic: { type: String, required: true }
    },
    { _id: false } // to avoid creating separate _id for each guest speaker
);

const EventSchema = new mongoose.Schema(
    {
        Title: { type: String, required: true },
        Categories_FK: { type: mongoose.Schema.Types.ObjectId, ref: "Categories", required: true },
        Cities_FK: { type: mongoose.Schema.Types.ObjectId, ref: "Cities", required: true },
        Organizer_FK: { type: mongoose.Schema.Types.ObjectId, ref: "Organizer", required: true },
        Status: {
            type: String,
            required: true,
            enum: ["Pending", "Approved", "Declined"],
            default: "Pending"
        },
        Description: { type: String, required: true },
        Date: { type: Date, required: true },
        Start_Time: { type: Date, default: Date.now, required: true },
        End_Time: { type: Date, default: Date.now, required: true },
        Location: { type: String, required: true },
        Booth_Count: { type: Number, required: true },
        Booth_Area: { type: Number, required: true },
        Guest_Speakers: [GuestSpeakerSchema], // Array of guest speakers
        Multiple_Images: [{ type: String, required: true }],
        Created_at: { type: Date, default: Date.now, required: true }
    }
);

const EventsModel = mongoose.model('Events', EventSchema);

export default EventsModel;