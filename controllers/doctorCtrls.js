const appointmentModel = require('../models/appointmentModel')
const doctorModel = require('../models/doctorModel')
const patientModel = require('../models/patient')

const getDoctorInfoController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId })
        res.status(200).send({
            success: true,
            messgae: 'doctor data fetch success',
            data: doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        })
    }
}

const updateProfileController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({ userId: req.body.userId }, req.body)
        res.status(201).send({
            success: true,
            message: 'Doctor Profile Updated',
            data: doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Doctor Profile Update issue',
            error
        })
    }
}

//get single doctor
const getDoctorByIdController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ _id: req.body.doctorId })
        res.status(200).send({
            success: true,
            message: 'Single Doc Info Fetched',
            data: doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Single Doctor Info',
            error
        })
    }
}

//doctor appointments
const doctorAppointmentsController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId })
        const appointments = await appointmentModel.find({ doctorId: doctor._id })
        res.status(200).send({
            success: true,
            message: 'Doctor Appointments fetched Successfully',
            data: appointments
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Doc Appointments',
            error
        })
    }
}

//appointment status
const updateStatusController = async (req, res) => {
    try {
        const { appointmentsId, status } = req.body
        const appointments = await appointmentModel.findByIdAndUpdate( appointmentsId, { status })
        const user = await patientModel.findOne({ _id: appointments.userId })
        const notification = user.notification
        notification.push({
            type: 'status-updated',
            message: `Your appointment has been ${status}`,
            onClickPath: '/doctor-appointments'
        })
        await user.save()
        res.status(200).send({
            success:true,
            message:'Status has been updated',
        })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success: false,
        message: 'Error while updating status',
        error
    })
}
}

//get patients controller
const getPatientsController = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting patients data',
            error
        })
    }
}

module.exports = { getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController, getPatientsController }