var express = require('express')
var router = express.Router({mergeParams: true})
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

const Schema = require("../db/schema.js")
const StudentModel = Schema.StudentModel
const ProjectModel = Schema.ProjectModel

var projectsController = require('../controllers/projects_controller.js');

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(methodOverride('_method'));

router.use('/:studentId/projects', projectsController);

router.get('/', (req, res) => {
    console.log(`Loading index page`)
    StudentModel.find({})
        .then((students) => {
            res.render('index', {
                students
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

router.get('/add', (req, res) => {
    console.log(`Loading add student page`)
    res.render('add_student')
})

router.put('/', function (req, res) {
    console.log(`Adding a new student`)
    var student = new StudentModel({
        name: req.body.name
    });
    student.save(function (err, student) {
        if (err) console.log(err);
        console.log(student);
        res.redirect('/students');
    });
});

router.put('/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    console.log(`Updating student: ${studentId}`)
    const updatedStudent = req.body;

    StudentModel.findByIdAndUpdate(studentId, updatedStudent, {
            new: true
        })
        .then((student) => {
            res.redirect(`/students/${studentId}`);
        })
        .catch((error) => {
            console.log(error)
        })
})

router.delete('/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    console.log(`Deleting student: ${studentId}`)

    StudentModel.findByIdAndRemove(studentId)
        .then(() => {
            res.redirect('/students')
        })
        .catch((error) => {
            console.log(error)
        })
})

router.get('/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    console.log(`Getting student: ${studentId}`)

    StudentModel.findById(studentId)
        .then((student) => {
            res.render('show_student', {
                student
            })
        })
})

router.get('/:studentId/edit', (req, res) => {
    const studentId = req.params.studentId;
})

router.put('/:studentId/projects/:projectId', (req, res) => {
    StudentModel.findById(studentId)
        .then((student) => {
            var oldProject = student.projects.id(projectId);
            oldProject.title = updatedProject.title;
            oldProject.unit = updatedProject.unit;
            StudentModel.findByIdAndUpdate(studentId, student, {
                    new: true
                })
                .then((student) => {
                    console.log(`${student.name} updated!`);
                    res.redirect(`/students/${studentId}`);
            res.render('edit_student', {
                student
            })
        })
})

module.exports = router;