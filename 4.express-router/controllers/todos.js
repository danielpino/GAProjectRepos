var express = require('express');
var router = express.Router();
var hbs = require('hbs');
var bodyParser = require('body-parser');
var data = require('../data.js');

router.use(bodyParser.urlencoded({
  extended: true
}));

router.get('/', function (req, res) {
  res.render('index', {
    todos: data.seededTodos
  });
})

router.post('/', function(req, res){
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