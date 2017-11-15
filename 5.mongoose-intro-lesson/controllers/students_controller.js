const express = require('express')
const router = express.Router()

const Schema = require("../db/schema.js")
const StudentModel = Schema.StudentModel
const ProjectModel = Schema.ProjectModel

router.get('/', (request, response) => {
  StudentModel.find({})
    .then((students) => {
      response.render('index', { 
        students: students
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

router.get('/:studentId', (request, response) => {
    const studentId = request.params.studentId
  
    StudentModel.findById(studentId)
      .then((student) => {
        response.render('show', {
          student: student
        })
      })
  })

module.exports = router;