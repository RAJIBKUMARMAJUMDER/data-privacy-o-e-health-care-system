const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patient_id: {
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
    medication: {
        type: Array,
        default: []
    },
    disease: {
        type: Array,
        default: []
    },
    tests: {
        type: Array,
        default: []
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

const patientModel = mongoose.model('patientType', patientSchema);

module.exports = patientModel;