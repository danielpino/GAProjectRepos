var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send(`COOL!`);
});

router.get('/:id', function(req, res){
    //do stuff
});

router.get('/:id/edit', function(req, res){
    //do stuff
});

module.exports = router;