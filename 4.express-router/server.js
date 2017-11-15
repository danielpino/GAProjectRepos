var express = require('express');
var app = express(); // install express on our server
var router = express.Router();

var todosController = require('./controllers/todos_controller.js');

var port = process.env.PORT || 3000; // tells the server where to listen for requests

app.listen(port, function () {
  console.log('hello-express is listening on port ' + port);
});

app.use('/todos', todosController);