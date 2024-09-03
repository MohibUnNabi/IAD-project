
import UserModel from '../models/UserModel.js'
import EventModel from '../models/EventModel.js';
class DashboardController {

  static getData = async (req, res) => {
    try {
      const currentDate = new Date();

   
      const previousEvents = await EventModel.countDocuments({ Event_Date: { $lt: currentDate } });


      const totalEvents = await EventModel.countDocuments();

      const totalExhibitors = await UserModel.countDocuments();
      const result = {
        totalEvents,
        previousEvents,
        totalExhibitors
      };
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  



}


export default DashboardController