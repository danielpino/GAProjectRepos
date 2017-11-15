var express = require('express'); // Loading express on our server
var app = express(); // install express on our server
var hbs = require('hbs'); // loads handlebars

app.use(express.static(__dirname + '/public')); // VERY IMPORTANT!! Make sure to add a '/'
app.set("view engine", "hbs"); //tells Express what to use for rendering templates

app.get("/", function (req, res) {
  // display 'Hello World!'
  res.send('Hello World!');
});

app.get('/greeting', function(req, res) {
  console.log(req.query);
  
  res.render('greeting', {
    data: req.query.saying
  });
});

app.get('/favorite-foods', function(req, res) {
  var favoriteFoods = ["Jeni's Almond Butter ice cream", 'Tacos from Superica', 'A Breakfast Sandwich from Gjelina to go in Venice', 'Croissants from Bottega Louie in Downtown Los Angeles', 'Pizza from Little Star in San Francisco'];

  res.render('favorite-foods', {
      data: favoriteFoods
  });
});

app.get("/rihanna", function (req, res) {
  // display 'Hello World!'
  res.send('Work work work work work');
});

app.get("/food/:food", function (req, res) {
  console.log(req.params);
  res.send(`I really love ${req.params.food}!`);
});

app.get("/sightings", function (req, res) {
  console.log(req.params);
  var responseObject = `{
                          state: ${req.query.state}, 
                          sights: ${req.query.sights}
                        }`;
  res.send(`How many ufo sightings do you think there are in ${req.query.state}? ${req.query.sights}.`);
});

app.get("/bigfoot", function (req, res) {
  console.log(req.params);
  if (req.query.blurry) {
    res.send(`It's not the photographer's fault. Bigfoot is blurry, and that's extra scary to me. There's a large, out-of-focus monster roaming the countryside. Run! He's fuzzy! Get out of there!`);
  } else {
    res.send(`A group of researchers have amassed evidence that the legendary Bigfoot is real, ABC News reported, with the scientists presenting reams of evidence.`)
  }
});

app.get('/hello/:name', function (req, res) {
  res.send({
    params: req.params,
    queries: req.query
  });
});

app.get('/favorite/:noun', function (req, res) {
  res.send(`I have a favorite ${req.params.noun}, it is ${req.query.noun}.`);
});

app.get('/add', function (req, res) {
  var answer = parseInt(req.query.num1) + parseInt(req.query.num2);
  res.send(`${answer}`);
});

app.get('/subtract', function (req, res) {
  var answer = parseInt(req.query.num1) - parseInt(req.query.num2);
  res.send(`${answer}`);
});

app.get('/multiply', function (req, res) {
  var answer = parseInt(req.query.num1) * parseInt(req.query.num2);
  res.send(`${answer}`);
});

app.get('/divide', function (req, res) {
  var answer = parseInt(req.query.num1) / parseInt(req.query.num2);
  res.send(`${answer}`);
});

app.get('/math/:operator', function (req, res) {
  console.log(req.params);
  console.log(req.query);
  var numQuery = `num1=${req.query.num1}&num2=${req.query.num2}`;
  switch (req.params.operator) {
    case 'add':
      res.redirect(`/add?${numQuery}`);
      break;
    case 'subtract':
      res.redirect(`/subtract?${numQuery}`);
      break;
    case 'divide':
      res.redirect(`/divide?${numQuery}`);
      break;
    case 'multiply':
      res.redirect(`/multiply?${numQuery}`);
      break;
  }


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