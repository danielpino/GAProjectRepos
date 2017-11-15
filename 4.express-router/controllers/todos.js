var express = require('express');
var router = express.Router();
var hbs = require('hbs');
var data = require('../data.js');

router.get('/', function(req,res) {
    res.render('index', {
      todos: data.seededTodos
    });
})

module.exports = router;