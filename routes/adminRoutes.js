const express = require('express')
const authMiddleware = require('../middlewares/auth_middleware')
const { getAllUsersController, getAllDoctorsController, changeAccountStatusController } = require('../controllers/adminCtrls')
const router = express.Router()

//GET METHOD|| USERS
router.get('/getAllUsers', authMiddleware, getAllUsersController)

//GET METHOD || DOCTORS
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController)

//POST ACCOUNT STATUS
router.post('/changeAccountStatus', authMiddleware, changeAccountStatusController) 

module.exports = router;