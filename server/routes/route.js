import express from 'express';
import UserController from '../controllers/UserController.js';
import EventController from '../controllers/EventController.js';
import RegistrationController from '../controllers/RegistrationController.js';
import ExhibitorController from '../controllers/ExhibitorController.js';
import BoothManagementController from '../controllers/BoothManagementController.js';
import CategoryController from '../controllers/CategoryController.js';
import DashboardController from '../controllers/DashboardController.js';
import TicketController from '../controllers/TicketController.js';
import ContactController from '../controllers/ContactController.js';
import TodoController from '../controllers/TodoController.js';
import multer from 'multer'; // Import multer for file uploads
import fs from 'fs'; // Import fs module for file system operations
import path from 'path'; // Import the path module

const router = express.Router();

// Create the destination directory if it doesn't exist
const destinationDir = './Images/Products';
if (!fs.existsSync(destinationDir)) {
  fs.mkdirSync(destinationDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destinationDir); // Use the destination directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname); // Generate unique filename
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(fileExtension)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPG, JPEG, PNG, and PDF files are allowed.'), false); // Reject the file
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

//Count
router.get('/Count', DashboardController.getData);


// User Routes
router.get('/User', UserController.getData);
router.post('/User', UserController.addData);
router.delete('/User/:id', UserController.deleteData);
router.get('/User/:id', UserController.viewSingleData);
router.put('/User/:id', UserController.updateData);
router.put('/UserStatus/:id', UserController.updateStatus);
router.post('/login', UserController.login);
router.put('/Change-Password', UserController.changePassword);

// Event Routes
router.get('/Event', EventController.getData);
router.get('/MyEvent/:id', EventController.MyEvent);
router.get('/PreviousEvent', EventController.PreviousEvent);
router.post('/Event', upload.single('Event_Images'), EventController.addData); 
router.delete('/Event/:id', EventController.deleteData);
router.get('/Event/:id', EventController.viewSingleData);
router.put('/Event/:id',upload.single('Event_Images'), EventController.updateData);
router.get('/EventFilter', EventController.filterEvents);
//Frontend
router.get('/frontendEvent', EventController.Schedule);

// Registration Routes
router.get('/Registration/:id', RegistrationController.getData);
router.get('/RegistrationforBoothCount/:id', RegistrationController.BoothCount);

router.post('/Registration', RegistrationController.addData);
router.delete('/Registration/:id', RegistrationController.deleteData);
router.get('/Registration/:id', RegistrationController.viewSingleData);
router.get('/EventToRegister/:id', RegistrationController.viewSingleData2);
router.put('/Registration/:id', RegistrationController.updateData);

// Exhibitor Routes
router.get('/Exhibitor', ExhibitorController.getData);
router.post('/Exhibitor', upload.array('Official_Document', 10), ExhibitorController.addData); // Array of images upload
router.delete('/Exhibitor/:id', ExhibitorController.deleteData);
router.get('/Exhibitor/:id', ExhibitorController.viewSingleData);
router.put('/Exhibitor/:id', upload.single('Official_Document'), ExhibitorController.updateData);
router.get('/UserAndExhibitor/:id', ExhibitorController.viewSingleData2);
// Booth Management Routes
router.get('/BoothManagement', BoothManagementController.getData);
router.post('/BoothManagement', BoothManagementController.addData);
router.delete('/BoothManagement/:id', BoothManagementController.deleteData);
router.get('/BoothManagement/:id', BoothManagementController.viewSingleData);
router.put('/BoothManagement/:id', BoothManagementController.updateData);

// Category Routes
router.get('/Category', CategoryController.getData);
router.post('/Category', CategoryController.addData);
router.delete('/Category/:id', CategoryController.deleteData);
router.get('/Category/:id', CategoryController.viewSingleData);
router.put('/Category/:id', CategoryController.updateData);

//Ticket

router.get('/Ticket', TicketController.getData);
router.post('/Ticket',upload.single('ticket'), TicketController.addData);

// Contact Routes
router.get('/Contact', ContactController.getData);
router.post('/Contact', ContactController.addData);



router.get('/todos', TodoController.getData);
router.post('/todos', TodoController.addData);
router.delete('/todos/:id', TodoController.deleteData);
router.get('/todos/:id', TodoController.viewSingleData);
router.put('/todos/:id', TodoController.updateData);

export default router;
