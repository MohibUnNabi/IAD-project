
import BoothManagementModel from '../models/BoothManagementModel.js';
import EventModel from '../models/EventModel.js'
import UserModel from '../models/UserModel.js';
import ExhibitorModel from '../models/ExhibitorModel.js';
import RegistrationModel from '../models/RegistrationModel.js';
class EventController {
  static getData = async (req, res) => {
    try {


      const currentDate = new Date();
  

      const events = await EventModel.find().populate('Cat_id_FK', 'Category_Name');

      const UpcomingEvents = events.filter(event => {
        const eventDate = new Date(event.Event_Date);
        return eventDate >= currentDate;
      });
  
    
      res.json(UpcomingEvents);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static PreviousEvent = async (req, res) => {
    try {
      const currentDate = new Date();
  
    
      const events = await EventModel.find();
  

      const previousEvents = events.filter(event => {
        const eventDate = new Date(event.Event_Date);
        return eventDate < currentDate;
      });
  
      res.json(previousEvents);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  static Schedule = async (req, res) => {
    try {
      const events = await EventModel.find().sort({ Event_Date: 1 }); 
      res.json(events);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
  }

static addData = async (req, res) => {
  try {
    const {Event_Name,Event_Location, Event_Date,Event_Time,Ticket_Price,Total_Days,Guest_Speaker, Booth_Count,Booth_Space,Booth_Price,Event_Description,Cat_id_FK} = req.body;

    const imageUrls = req.file.filename; 
   
    const Event = new EventModel({
      Event_Name,
      Event_Location, 
      Event_Date, 
      Event_Time,
      Total_Days,
      Guest_Speaker,
      Booth_Count,
      Booth_Space,
      Booth_Price,
      Ticket_Price,
      Event_Description,
      Cat_id_FK,
      Event_Images: imageUrls,
    })

    const savedEvent = await Event.save();
    for (var i=0;i<savedEvent.Booth_Count;i++){
      const Booth = new BoothManagementModel({
        Event_id_Fk : savedEvent._id,
        Booth_Reserved  : false,
      })
      await Booth.save()
    }
    res.status(201).json({message: "Event addes succesfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal Server Errror"});
  }
}

static deleteData = async (req, res) => {
  try {

    const EventId = req.params.id;


    await EventModel.findByIdAndDelete(EventId);

    // Send a success response
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
static updateData = async (req, res) => {
  try {
    const EventId = req.params.id;
    const {Event_Name, Event_Location,Ticket_Price, Event_Date,Event_Time,Total_Days,Guest_Speaker, Booth_Count,Booth_Space,Booth_Price,Event_Description,Cat_id_FK} = req.body;
    const updatedEvent = await EventModel.findByIdAndUpdate(
      EventId,
      { Event_Name,Event_Location,Ticket_Price, Event_Date,Event_Time,Total_Days,Guest_Speaker,Booth_Count,Booth_Space,Booth_Price,Event_Description,Cat_id_FK },
      { new: true }
    );
    if (!updatedEvent) {
      return res.Event_status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ message: "Event updated successfully", Event: updatedEvent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
static viewSingleData = async (req, res) => {
  try {
    const EventId = req.params.id;
    const Event = await EventModel.findById(EventId);
    if (!Event) {
      return res.tatus(404).json({ error: "Event not found" });
    }
    res.status(200).json(Event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}




static MyEvent = async (req, res) => {
  try {
    const UserId = req.params.id;
    const User = await UserModel.findById(UserId);
    if (!User) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const Exhibitor = await ExhibitorModel.findOne({ User_id_Fk: UserId });
    if (!Exhibitor) {
      return res.status(404).json({ error: "Exhibitor not found" });
    }
    
    const ExhibitorIds = Exhibitor._id;

    const Register = await RegistrationModel.find({ ExhibitorId: ExhibitorIds });
    if (!Register) {
      return res.status(404).json({ error: "Register not found" });
    }
    
    const eventIds = Register.map(registration => registration.Event_id_Fk);
    const events = await EventModel.find({ _id: { $in: eventIds } });
    
    if (!events) {
      return res.status(404).json({ error: "Event not found" });
    }
    
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


static filterEvents = async (req, res) => {
  try {
    const filter = req.query.filter;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let events;

    if (!filter || filter === "today") {  // Default to "today" if filter is not provided or is "today"
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      events = await EventModel.find({
        Event_Date: {
          $gte: today.toISOString().split('T')[0],
          $lt: tomorrow.toISOString().split('T')[0],
        },
      });
    } else if (filter === "week") {
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      events = await EventModel.find({
        Event_Date: {
          $gte: today.toISOString().split('T')[0],
          $lt: nextWeek.toISOString().split('T')[0],
        },
      });
    } else {
      events = await EventModel.find({});  // Handle other cases as needed
    }

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

}


export default EventController