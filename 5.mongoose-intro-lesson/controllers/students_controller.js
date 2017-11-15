const express = require('express')
const router = express.Router()
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

const Schema = require("../db/schema.js")
const StudentModel = Schema.StudentModel
const ProjectModel = Schema.ProjectModel

router.use(bodyParser.urlencoded({
    extended: true
  }));
router.use(methodOverride('_method'));

router.get('/', (req, res) => {
    StudentModel.find({})
        .then((students) => {
            console.log(students);
            res.render('index', {
                students
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

router.get('/:studentId', (req, res) => {
    StudentModel.findById(req.params.studentId)
        .then((student) => {
            console.log(student);
            res.render('show', {
                student
            })
        })
})

router.put('/:studentId', (req, res) => {
    const updatedStudent = req.body;

    console.log(req.body);

    StudentModel.findByIdAndUpdate(req.params.studentId, updatedStudent, {
            new: true
        })
        .then((student) => {
            console.log(`${student.name} updated!`);
            res.redirect(`/students/${studentId}`);
        })
        .catch((error) => {
            console.log(error)
        })
})

router.get('/:studentId/edit', (req, res) => {
    StudentModel.findById(req.params.studentId)
        .then((student) => {
            res.render('edit', {
                student
            })
        })
})


module.exports = router;