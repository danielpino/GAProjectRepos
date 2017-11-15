var mongoose = require('mongoose');
var Schema = require("./schema.js");

var StudentModel = Schema.StudentModel;
var ProjectModel = Schema.ProjectModel;

// First we clear the database of existing students and projects.
StudentModel.remove({})
  .then(() => {
    console.log('All students deleted!')
  })
  .catch((error) => {
    console.log(error)
  })

ProjectModel.remove({})
  .then(() => {
    console.log('All projects deleted!')
  })
  .catch((error) => {
    console.log(error)
  })

// Now, we will generate instances of a Student and of their Project.
const project1 = new ProjectModel({title: "Project 1!!!", unit: "JS"})
const project2 = new ProjectModel({title: "Project 2!!!", unit: "Express"})
const project3 = new ProjectModel({title: "Project 3!!!", unit: "Angular"})
const project4 = new ProjectModel({title: "Project 4!!!", unit: "Rails"})

const projects = [project1, project2, project3, project4]

const becky = new StudentModel({name: "Becky" , projects: projects})
const brandon = new StudentModel({name: "Brandon", projects: projects})
const steve = new StudentModel({name: "Steve", projects: projects})

const students = [becky, brandon, steve];

StudentModel.insertMany(students)
  .then(() => {
    console.log(`Added ${students.length} students to database.`)
  })
  .catch((error) => {
    console.log(error)
  })
  .then(() => {
    Schema.db.close()
  })