const express = require('express');
const authMiddleware = require('../middlewares/auth_middleware');
const { getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController, getPatientsController } = require('../controllers/doctorCtrls');
const router = express.Router();

//POST SINGLE DOC INFO
router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController)

//POST UPDATE PROFILE
router.post('/updateProfile', authMiddleware, updateProfileController);

//POST GET SINGLE DOC INFO
router.post('/getDoctorById', authMiddleware, getDoctorByIdController);

//GET APPOINTMENTS
router.get('/doctor-appointments', authMiddleware, doctorAppointmentsController)

//POST Update Status
router.post('/update-status', authMiddleware, updateStatusController)

//GET PATIENT INFO
router.get('/getPatients', authMiddleware, getPatientsController)
module.exports = router;