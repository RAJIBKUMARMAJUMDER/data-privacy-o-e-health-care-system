const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    patient_id: {
        type: String,
        required:false
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
    isAdmin: {
        type: Boolean,
        default: false
    },
    isDoctor: {
        type: Boolean,
        default: false
    },
    notification: {
        type: Array,
        default: []
    },
    seenNotification: {
        type: Array,
        default: []
    }
});

const patientModel = mongoose.model('patients', userSchema);

module.exports = patientModel;