const express = require('express')
const router = express.Router()
const Teacher = require('../models/teacher')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET = "secret" } = process.env;

//Teacher Signup
router.post('/signup', async (req, res) => {
    const teacher = new Teacher({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10)
    })

    try {
        const t = await teacher.save()
        res.json(t)
    } catch (err) {
        res.send('Error ' + err)
    }
})

//Teacher Signin
router.post('/signin', async (req, res) => {
    console.log(req.body)
    try {
        const teacher = await Teacher.findOne({ email: req.body.email })
        if (teacher) {
            const result = await bcrypt.compare(req.body.password, teacher.password);
            if (result) {
                const token = await jwt.sign({ username: teacher.email }, SECRET);
                res.json({ token });
            } else {
                res.status(400).json({ error: "Password doesn't match" });
            }
        } else {
            res.status(400).json({ error: "Invalid Teacher Details" });
        }
    } catch (err) {
        res.send('Error ' + err)
    }
})

module.exports = router