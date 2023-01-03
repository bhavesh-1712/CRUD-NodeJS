const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    prn_no:{
        type: Number,
        unique: true,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Student', studentSchema)