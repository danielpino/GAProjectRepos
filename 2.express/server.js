var express = require('express'); // Loading express on our server
var app = express(); // install express on our server
var hbs = require('hbs'); // loads handlebars

var miscController = require('./controllers/misc_controller.js');
var mathController = require('./controllers/math_controller.js');

app.use(express.static(__dirname + '/public')); // VERY IMPORTANT!! Make sure to add a '/'
app.set("view engine", "hbs"); //tells Express what to use for rendering templates

app.use('/math', mathController);
app.use('/misc', miscController);


app.get("/", function (req, res) {
  // display 'Hello World!'
  res.send('Hello World!');
});

app.get('/greeting', function (req, res) {
  console.log(req.query);
  res.render('greeting', {
    data: req.query.saying
  });
});

app.get('/hello/:name', function (req, res) {
  res.send({
    params: req.params,
    queries: req.query
  });
});

app.get("/:name", function (req, res) {
  console.log(req.params);
  console.log(req.route);
  console.log(req.query);
  res.send(`Hello, ${req.params.name}. My name is ${req.query.first_name} ${req.query.last_name}.`);
});



var port = process.env.PORT || 3000; // tells the server where to listen for requests

app.listen(port, function () {
  // tells the server where to listen for requests on port 3000

  console.log('hello-express is listening on port ' + port);
}); // actualizing the line above