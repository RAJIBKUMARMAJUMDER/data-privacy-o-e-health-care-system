const patientModel = require('../models/patient')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');
const appointmentModel = require('../models/appointmentModel')
const moment = require('moment')

//register callback
const registerController = async (req, res) => {
    try {
        const existingUser = await patientModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(200).send({ message: 'User Already Exist', success: false });
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword
        let id_num = Math.floor(Math.random() * 100000);
        let pat_id = "pat".concat(id_num);
        const newUser = new patientModel({ ...req.body, patient_id: pat_id })
        await newUser.save()
        res.status(201).send({ message: 'Register Successful', success: true });
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: `Registration Error ${error.message}` })

    }
};

//login callback
const loginController = async (req, res) => {
    try {
        const user = await patientModel.findOne({ email: req.body.email })
        if (!user) {
            //const doctor = await doctorModel.findOne({email:req.body.email});
            //if (!doctor) {
            //the check nurse, if not nurse then check paramedical, if not paramedical then check pharmacist, even if not pharmacist then send error message. But if found in any one of the above the do the isMatch code.}
            return res.status(200).send({ message: 'User Does Not Exists', success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({ message: 'Invalid Email or Password', success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ message: 'Login Success', success: true, token });
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: `Login Error ${error.message}` })
    }
};

const authController = async (req, res) => {
    try {
        const user = await patientModel.findById({ _id: req.body.userId });
        user.password = undefined;
        if (!user) {
            return res.status(200).send({ success: false, message: 'user not found' })
        } else {
            res.status(200).send({ success: true, data: user });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'auth error', error })
    }
}

//Apply Doctor Controls
const applyDoctorController = async (req, res) => {
    try {
        // const doctor_password = await patientModel.find({email:req.body.email}, {email:1, _id:0});
        const newDoctor = await doctorModel({ ...req.body, status: 'pending' });
        await newDoctor.save();
        const adminUser = await patientModel.findOne({ isAdmin: true });
        const notification = adminUser.notification
        notification.push({
            type: 'apply-doctor-request',
            message: `${newDoctor.name} Has Applied for a Doctor Account`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.name,
                onClickPath: '/admin/doctors'
            }
        })
        await patientModel.findByIdAndUpdate(adminUser._id, { notification })
        res.status(201).send({
            success: true,
            message: "Doctor Account Applied Successfully"
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error while Applying for Doctor'
        })
    }

};

//notification controller
const getAllNotificationController = async (req, res) => {
    try {
        const user = await patientModel.findOne({ _id: req.body.userId });
        const seennotification = user.seenNotification
        const notification = user.notification
        seennotification.push(...notification)
        user.notification = []
        user.seenNotification = notification
        const updatedUser = await user.save()
        res.status(200).send({
            success: true,
            message: 'All notification marked as read',
            data: updatedUser,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'Error in notification',
            success: false,
            error
        })
    }
};

//delete notifications
const deleteAllNotificationController = async (req, res) => {
    try {
        const user = await patientModel.findOne({ _id: req.body.userId })
        user.notification = []
        user.seenNotification = []
        const updatedUser = await user.save()
        updatedUser.password = undefined
        res.status(200).send({
            success: true,
            message: 'Notifications Deleted successfully',
            data: updatedUser,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Unable to delete all notifications',
            error
        })
    }
}

//get all doctors
const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await doctorModel.find({ status: 'approved' })
        res.status(200).send({
            success: true,
            message: 'Doctor Lists Fetched Successfully',
            data: doctors,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error while fetching doctors'
        })
    }
}

//book apointment
const bookAppointmentController = async (req, res) => {
    try {
        req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString()
        req.body.time = moment(req.body.time, "HH:mm").toISOString()
        req.body.status = "pending"
        const newAppointment = new appointmentModel(req.body)
        await newAppointment.save()
        const doctor = await patientModel.findOne({ _id: req.body.doctorInfo.userId })
        doctor.notification.push({
            type: 'New-appointment',
            message: `A new Appointment Request from ${req.body.userInfo.name}`,
            onClickPath: '/user/appointments'
        })
        await doctor.save()
        res.status(200).send({
            success: true,
            message: 'Appointment Booked Succesfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while booking Appointment',
            error
        })
    }
}

//booking availability
const bookingAvailabilityController = async (req, res) => {
    try {
        const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
        const fromTime = moment(req.body.time, "HH:mm").subtract(1, 'hours').toISOString();
        const toTime = moment(req.body.time, "HH:mm").add(1, 'hours').toISOString();
        const doctorId = req.body.doctorId
        const appointments = await appointmentModel.find({
            doctorId,
            date,
            time: { $gte: fromTime, $lte: toTime }
        })
        if (appointments.length > 0) {
            return res.status(200).send({
                success: true,
                message: 'Appointments not available at this time'
            })
        } else {
            return res.status(200).send({
                success: true,
                message: 'Appointment available '
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while checking availability',
            error
        })
    }
}

//user appointments list
const userAppointmentsController = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({ userId: req.body.userId });
        res.status(200).send({
            success: true,
            message: 'Users Appointments fetched',
            data: appointments
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while fetching appointments list',
            error
        })
    }
}

const updateProfileController = async (req, res) => {
    try {
        const user = await patientModel.findOneAndUpdate({_id:req.body.userId}, req.body)
        res.status(201).send({
            success:true,
            message:"User Profile Updated",
            data:user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'User Profile Update Issue',
            success: false,
            error
        })
    }
}

module.exports = { registerController, loginController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController, updateProfileController }