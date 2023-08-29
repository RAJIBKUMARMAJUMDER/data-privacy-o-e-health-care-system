// main entry point. using this file the server will run

const express = require('express')
const colors = require('colors')
const moragan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

//dotenv config
dotenv.config()

//mongodb connection
connectDB();

//rest object
const app = express()

//middlewares
app.use(express.json())
app.use(moragan('dev')) 

//routes
// app.use('/api/v1/patient', require('./routes/patientRoutes'))
app.use('/api/v1/user', require('./routes/userRoutes'))
app.use('/api/v1/admin', require('./routes/adminRoutes'))
app.use('/api/v1/doctor', require('./routes/doctorRoutes'))

//port
const port = process.env.PORT || 8080

//listen port
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgCyan.brightWhite.bold);
});