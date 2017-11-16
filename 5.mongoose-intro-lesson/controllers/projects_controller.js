const express = require('express')
var router = express.Router({
    mergeParams: true
})
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
    const studentId = req.params.studentId;
    console.log(`Getting projects for student: ${studentId}`)

    StudentModel.findById(studentId)
        .then((student) => {
            res.render('show_student', {
                student
            })
        })
})

router.get('/add', (req, res) => {
    const studentId = req.params.studentId;
    console.log(`Loading Add Project page for student: ${studentId}`)

    StudentModel.findById(studentId)
        .then((student) => {
            res.render('add_project', {
                student
            })
        })
})

router.put('/:projectId', (req, res) => {
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
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    res.redirect(`${projectId}`);
})

router.put('/', (req, res) => {
    const studentId = req.params.studentId;
    const projectId = req.params.projectId;
    console.log(`Adding project for student: ${studentId}`)

    const newProject = new ProjectModel({
        title: req.body.title,
        unit: req.body.unit
    })
    console.log(`Updated Project: ${newProject}`);

    StudentModel.findByIdAndUpdate(studentId, {
        $push: {
            'projects': newProject
        }
    }).exec(function (err, item) {
        if (err) console.log(err);
        console.log(item)
        res.redirect(`/students/${studentId}`);
    })
})

router.get('/:projectId', (req, res) => {
    var studentId = req.params.studentId;
    var projectId = req.params.projectId;
    console.log(`Getting Project details for student: ${studentId} and project ${projectId}`)

    StudentModel.findById(studentId)
        .then((student) => {
            var project = student.projects.find(function (project) {
                return project._id == projectId
            })
            res.render('show_project', {
                project,
                student
            })
        })
})

router.get('/:projectId/edit', (req, res) => {
    var studentId = req.params.studentId;
    var projectId = req.params.projectId;
    console.log(`Loading Edit Project Page for student: ${studentId} and project ${projectId}`)

    StudentModel.findById(studentId)
        .then((student) => {
            var project = student.projects.id(projectId);
            res.render('edit_project', {
                project,
                student
            })
        })
})

router.delete('/:projectId', (req, res) => {
    const studentId = req.params.studentId;
    const projectId = req.params.projectId;
    console.log(`Deleting project ${projectId} for student: ${studentId}`)

    const updatedProject = req.body;
    console.log(req.body);

    StudentModel.findByIdAndUpdate(studentId, {
        $pull: {
            projects: {
                _id: projectId
            }
        }
    }).exec(function (err, item) {
        if (err) console.log(err);
        res.redirect(`/students/${studentId}`);
    })
})

module.exports = router;