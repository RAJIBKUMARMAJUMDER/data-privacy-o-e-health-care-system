const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    doctor_id: {
        type: String,
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    phoneNumber: {
        type: String,
        required: [true, 'contact number is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    gender: {
        type: String,
        required: [true, 'gender is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    role: {
        type: String
    },
    specialization: {
        type: String,
    },
    experience: {
        type: String,
    },
    feesPerConsultation: {
        type: Number,
    },
    status:{
        type:String,
        default:'pending'
    },
    timings: {
        type: Object,
    },
    notification: {
        type: Array,
        default: []
    },
    seenNotification: {
        type: Array,
        default: []
    }
}, { timestamps: true });

const doctorModel = mongoose.model('doctorType', doctorSchema);

module.exports = doctorModel;