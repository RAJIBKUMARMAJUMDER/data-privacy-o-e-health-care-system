const express = require('express')
const { authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController, loginController, registerController, updateProfileController} = require('../controllers/userCtrls');
const authMiddleware = require('../middlewares/auth_middleware');

//router object
const router = express.Router()

//routes
//LOGIN || POST
router.post('/login', loginController);

//REGISTER || POST
router.post('/register', registerController);

//Auth || POST
router.post('/getUserData', authMiddleware, authController);

//Apply Doctor || POST
router.post('/apply-doctor', authMiddleware, applyDoctorController);

//Notification Doctor || POST
router.post('/get-all-notification', authMiddleware, getAllNotificationController);

//Notification Doctor || POST
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController);

//GET ALL DOC
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);

//BOOK APPOINTMENT
router.post('/book-appointment', authMiddleware, bookAppointmentController)

//Booking Availability
router.post('/booking-availability', authMiddleware, bookingAvailabilityController)

//APPOINTMENTS LIST
router.get('/user-appointments', authMiddleware, userAppointmentsController)

//POST USER PROFILE
router.post('/updateProfile', authMiddleware, updateProfileController);

module.exports = router;