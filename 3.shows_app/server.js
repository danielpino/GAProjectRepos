var express = require('express');
var app = express();
var hbs = require('hbs');

app.use(express.static(__dirname + '/public'));
app.set("view engine", "hbs");

var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('hello-express is listening on port ' + port);
});

app.get(`/shows`, function (req, res) {
    const faveShows = [`Breaking Bad`, `Weeds`, `Dexter (at least the first few seasons)`];
    res.render('shows', {
        data: faveShows
    });
})