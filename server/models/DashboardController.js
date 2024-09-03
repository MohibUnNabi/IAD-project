import EventModel from '../models/EventModel';

const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};


export const getTodayOrUpcomingEvent = async (req, res) => {
    try {
        const todayDate = getTodayDate();

   
        const event = await EventModel.findOne({
            Event_Date: todayDate
        }) || await EventModel.findOne({
            Event_Date: { $gt: todayDate }
        }).sort({ Event_Date: 1 });

        if (!event) {
            return res.status(404).json({ message: 'No events found' });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
