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

router.post('/', function (req, res) {
    var student = new StudentModel({
        name: req.body.name
    });
    student.save(function (err, student) {
        if (err) {
            console.log(err);
        }
        console.log(student);
        res.redirect('/students');
    });
});

router.put('/:studentId', (req, res) => {
    const updatedStudent = req.body;

    console.log(req.body);

    StudentModel.findByIdAndUpdate(req.params.studentId, updatedStudent, {
            new: true
        })
        .then((student) => {
            console.log(`${student.name} updated!`);
            res.redirect(`/students/${req.params.studentId}`);
        })
        .catch((error) => {
            console.log(error)
        })
})

router.delete('/:studentId', (req, res) => {
    const studentId = req.params.studentId
    console.log(`Deleting student with ID: ${studentId}`)

    StudentModel.findByIdAndRemove(studentId)
        .then(() => {
            res.redirect('/students')
        })
        .catch((error) => {
            console.log(error)
        })
})

router.get('/:studentId', (req, res) => {
    StudentModel.findById(req.params.studentId)
        .then((student) => {
            console.log(`Getting student with ID: `, student.id);
            res.render('show_student', {
                student
            })
        })
})

router.get('/:studentId/edit', (req, res) => {
    StudentModel.findById(req.params.studentId)
        .then((student) => {
            res.render('edit_student', {
                student
            })
        })
})

router.get('/:studentId/projects', (req, res) => {
    StudentModel.findById(req.params.studentId)
        .then((student) => {
            res.render('show_student', {
                student
            })
        })
})

router.put('/:studentId/projects', (req, res) => {
    const studentId = req.params.studentId;
    const newProject = req.body;

    StudentModel.findById(studentId)
        .then((student) => {
            student.projects.push(newProject);
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
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    res.redirect(`${projectId}`);
})

router.get('/:studentId/projects/add', (req, res) => {
    StudentModel.findById(req.params.studentId)
        .then((student) => {
            res.render('add_project', {
                student
            })
        })
})

router.get('/:studentId/projects/:projectId', (req, res) => {
    StudentModel.findById(req.params.studentId)
        .then((student) => {
            var project = student.projects.find(function (project) {
                return project._id == req.params.projectId
            })
            res.render('show_project', {
                project,
                student
            })
        })
})

router.get('/:studentId/projects/:projectId/edit', (req, res) => {
    StudentModel.findById(req.params.studentId)
        .then((student) => {
            var project = student.projects.id(req.params.projectId);
            res.render('edit_project', {
                project,
                student
            })
        })
})

router.put('/:studentId/projects/:projectId', (req, res) => {
    const studentId = req.params.studentId;
    const projectId = req.params.projectId;

    const updatedProject = req.body;
    console.log(req.body);

    StudentModel.findByIdAndUpdate(studentId, {
        $push: {
            projects: {
                updatedProject
            }
        }
    }).exec(function (err, item) {
        if (err) console.log(err);
        res.redirect(`/students/${studentId}`);
    })
})

router.delete('/:studentId/projects/:projectId', (req, res) => {
    const studentId = req.params.studentId;
    const projectId = req.params.projectId;

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