const express = require('express');
const authMiddleware = require('../middlewares/auth_middleware');
const { registerController, loginController } = require('../controllers/patientCtrls');

//router object
const router = express.Router();

//routes
//LOGIN || POST
router.post('/login', loginController);

//REGISTER || POST
router.post('/register', registerController);

module.exports = router;