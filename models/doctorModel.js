const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    doctor_id: {
        type: String,
        rquired: false
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    specialization: {
        type: String,
        required: [true, 'Specialization is required']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone Number is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    experience: {
        type: String,
        rquired: [true, 'experience is required']
    },
    feesPerConsultation: {
        type: Number,
        required: [true, 'fee is required']
    },
    status:{
        type:String,
        default:'pending'
    },
    timings: {
        type: Object,
        required: [true, 'work timing is required']
    }
}, { timestamps: true })

const doctorModel = mongoose.model('doctors', doctorSchema);

module.exports = doctorModel;