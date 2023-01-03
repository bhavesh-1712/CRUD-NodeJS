const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/UserDB'

const app = express()

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*')
  
    next();
  });

// mongoose.set("strictQuery", false);
mongoose.connect(url)
const conn = mongoose.connection

conn.on('open', () => {
    console.log('connected...')
})

app.use(express.json())

const studentRouter = require('./routes/students')
app.use('/students', studentRouter)

const teacherRouter = require('./routes/teachers')
app.use('/teachers', teacherRouter)

app.listen(9000, () => {
    console.log('Server started')
})