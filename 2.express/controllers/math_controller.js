var express = require('express');
var router = express.Router();

router.get('/add', function (req, res) {
    var answer = parseInt(req.query.num1) + parseInt(req.query.num2);
    res.send(`${answer}`);
});

router.get('/subtract', function (req, res) {
    var answer = parseInt(req.query.num1) - parseInt(req.query.num2);
    res.send(`${answer}`);
});

router.get('/multiply', function (req, res) {
    var answer = parseInt(req.query.num1) * parseInt(req.query.num2);
    res.send(`${answer}`);
});

router.get('/divide', function (req, res) {
    var answer = parseInt(req.query.num1) / parseInt(req.query.num2);
    res.send(`${answer}`);
});

router.get('/do/:operator', function (req, res) {
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

module.exports = router;