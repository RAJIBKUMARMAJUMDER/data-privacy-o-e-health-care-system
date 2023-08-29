const patientModel = require('../models/patientModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel2 = require('../models/doctorModel2');
const doctorModel = require('../models/doctorModel');
const appointmentModel = require('../models/appointmentModel')
const adminModel = require('../models/patient')
const moment = require('moment')

//register callback
const registerController = async (req, res) => {
    try {
        if (req.body.role === "patient") {
            let id_num = Math.floor(Math.random() * 100000);
            let pat_id = "pat".concat(id_num);
            const existingUser = await patientModel.findOne({ patient_id: pat_id });
            if (existingUser) {
                return res.status(200).send({ message: "Couldn't create a user", success: false });
            }
            const password = req.body.password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            req.body.password = hashedPassword
            const newUser = new patientModel({ ...req.body, patient_id: pat_id })
            await newUser.save()
            res.status(201).send({ message: 'Register Successful', success: true });
        } else if (req.body.role === "doctor") {
            let id_num = Math.floor(Math.random() * 100000);
            let doc_id = "doc".concat(id_num);
            const existingUser = await doctorModel2.findOne({ doctor_id: doc_id });
            if (existingUser) {
                return res.status(200).send({ message: "Couldn't create a user", success: false });
            }
            const password = req.body.password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            req.body.password = hashedPassword
            const newUser = new doctorModel2({ ...req.body, doctor_id: doc_id })
            await newUser.save()
            res.status(201).send({ message: 'Register Successful', success: true });
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: `Registration Error ${error.message}` })

    }
};

const loginController = async(req, res) => {
    try {
        if (req.body.role === "patient"){
            const user = await patientModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(200).send({ message: 'User Does Not Exists', success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({ message: 'Invalid Email or Password', success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ message: 'Login Success', success: true, token });
        } else if (req.body.role === "doctor") {
            const user = await doctorModel2.findOne({ email: req.body.email })
            if (!user) {
                return res.status(200).send({ message: 'User Does Not Exists', success: false });
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(200).send({ message: 'Invalid Email or Password', success: false });
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).send({ message: 'Login Success', success: true, token });
        } else if (req.body.role === "admin") {
            const user = await adminModel.findOne({ isAdmin : true })
            if (!user) {
                return res.status(200).send({ message: 'User Does Not Exists', success: false });
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(200).send({ message: 'Invalid Email or Password', success: false });
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).send({ message: 'Login Success', success: true, token });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: `Login Error ${error.message}` })
    } 
}


module.exports = { registerController, loginController }