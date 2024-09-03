import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({

    Ticket_Price: { type: String, required: true },
    Ticket_Quantity: { type: String, required: true },
    Event_id_Fk: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    User_id_Fk: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

const TicketModel = mongoose.model("Ticket", TicketSchema)

export default TicketModel