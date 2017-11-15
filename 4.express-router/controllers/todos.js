var express = require('express');
var router = express.Router();
var hbs = require('hbs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var data = require('../data.js');

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(methodOverride('_method'));

router.get('/', function (req, res) {
  res.render('index', {
    todos: data.seededTodos
  });
})

router.delete('/:id', function (req, res) {
  data.seededTodos.splice(req.params.id, 1); // remove the item from the array

  res.redirect('/todos'); // redirect back to the index route
});

router.put('/:id', function(req, res) {
  var todoToEdit = data.seededTodos[req.params.id];

  todoToEdit.description = req.body.description;
  todoToEdit.location = req.body.location;
  todoToEdit.urgent = req.body.urgent;

  res.redirect('/todos');
})

router.get('/:id/edit', function (req, res) {
  res.render('edit', {
    todo: {
      id: req.params.id,
      description: data.seededTodos[req.params.id].description,
      location: data.seededTodos[req.params.id].location,
      urgent: data.seededTodos[req.params.id].urgent,
    }
  });
});

router.post('/', function (req, res) {
  console.log("POSTING")
  data.seededTodos.push(req.body);
  res.redirect('/todos');
});

router.get('/new', function (req, res) {
  res.render('new');
});

router.get('/:id', function (req, res) {
  var todo = data.seededTodos[req.params.id];
  res.render('show', {
    todo
  });
})

module.exports = router;