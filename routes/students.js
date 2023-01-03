const express = require('express')
const router = express.Router()
const Student = require('../models/student')

//Get All Students
router.get('/', async(req, res) => {
    try{
        const students = await Student.find()
        res.json(students) 
    }catch(err){
        res.send('Error '+err)
    }
})

//Get Student By Id
router.get('/:id', async(req, res) => {
    try{
        const student = await Student.findById(req.params.id)
        res.json(student) 
    }catch(err){
        res.send('Error '+err)
    }
})

//Add Student
router.post('/', async(req, res) => {
    const students = new Student({
        name: req.body.name,
        prn_no: req.body.prn_no,
        branch: req.body.branch,
        year: req.body.year
    })

    try{
       const std = await students.save()
       res.json(std)
    }catch(err){
        res.send('Error '+err)
    }
})

//Update Student branch
router.patch('/:id', async(req, res) => {
    try{
        const student = await Student.findById(req.params.id)
        student.branch = req.body.branch
        const std = await student.save()
        res.json(std)
    }catch(err){
        res.send('Error '+err)
    }
})

//Update Student
router.put('/', async(req, res) =>{
    try{
        const student = await Student.findOne({ prn_no: req.body.prn_no })
        student.name = req.body.name,
        student.prn_no = req.body.prn_no,
        student.branch = req.body.branch,
        student.year = req.body.year
        const std = await student.save()
        res.json(std)
    }catch(err){
        res.send('Error '+err+req.body.name)
    }
})

//Delete Student
router.delete('/:id', async(req, res) => {
    try{
        const student = await Student.findById(req.params.id)
        const std = await student.remove()
        res.json(std)
    }catch(err){
        res.send('Error '+err)
    }
})

module.exports = router