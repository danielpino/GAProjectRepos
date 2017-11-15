var express = require('express'); // Loading the express module on our server

var app = express(); // Creates a new instance of express on our server

app.get("/", function (req, res) {
  // display 'Hello World!'
  res.send('Hello World!');
});

app.get("/greeting", function (req, res) {
  // display 'Hello World!'
  res.send('Hey, WDI 12!');
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
  if (req.query.blurry){
    res.send(`It's not the photographer's fault. Bigfoot is blurry, and that's extra scary to me. There's a large, out-of-focus monster roaming the countryside. Run! He's fuzzy! Get out of there!`);
  } else {
    res.send(`A group of researchers have amassed evidence that the legendary Bigfoot is real, ABC News reported, with the scientists presenting reams of evidence.`)
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