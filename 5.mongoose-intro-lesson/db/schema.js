var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/students');

// Use ES6 native promises. We are specifying a Promise library to avoid a depreciation warning in the console.
mongoose.Promise = global.Promise;

// Now that we are connected, let's save that connection to the database in a variable. We are just doing this to keep our code DRY.
var db = mongoose.connection;

// Will log an error if db can't connect to MongoDB
db.on('error', function (err) {
    console.log(err);
});

// Will log "database has been connected" if it successfully connects.
db.once('open', function () {
    console.log("database has been connected!");
});

// First, we instantiate a namespace for our Schema constructor defined by mongoose.
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    title: String,
    unit: String
});

var StudentSchema = new Schema({
    name: String,
    age: Number,
    projects: [ProjectSchema]
});

var ProjectModel = mongoose.model("Project", ProjectSchema);
var StudentModel = mongoose.model("Student", StudentSchema);

// StudentModel.create({
//         name: 'Frankie Q.',
//         age: 31
//     })
//     .then(function (student) {
//         console.log(student);
//     })
//     .catch((error) => {
//         console.log(error)
//     })

// var anna = new StudentModel({
//     name: "Anna",
//     age: 28
// });
// var project1 = new ProjectModel({
//     title: "memory gamesss",
//     unit: "JS"
// });

// Now we add that project to a student's collection / array of projects.
// anna.projects.push(project1);

// In order to save that project to the student, we need to call `.save()` on the student -- not the project.
// anna.save()
//     .then((anna) => {
//         console.log(anna)
//     })
//     .catch((error) => {
//         console.log(error);
//     })


// Disconnect from database
// db.close();

module.exports = {
    StudentModel,
    ProjectModel,
    db
};