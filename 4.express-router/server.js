var express = require('express');
var app = express(); // install express on our server
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var todosController = require('./controllers/todos.js');

var port = process.env.PORT || 3000; // tells the server where to listen for requests
app.listen(port, function () {
  console.log('hello-express is listening on port ' + port);
});

app.set("view engine", "hbs");

app.use('/todos', todosController);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));