import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    Event_Name: { type: String, required: true },
    Event_Location: { type: String, required: true },
    Event_Date: { type: String, required: true },
    Event_Time: { type: String, required: true },
    Ticket_Price: { type: String, required: true },
    Event_Images: { type: String, required: true },
    Total_Days: { type: String, required: true },
    Booth_Count: { type: String, required: true },
    Booth_Space: { type: String, required: true },
    Booth_Price: { type: String, required: true },
    Guest_Speaker: [{ type: String, required: true }],
    Event_Description: { type: String, required: true },

    Cat_id_FK: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
})

const EventModel = mongoose.model("Event", EventSchema)

export default EventModel