var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {
    res.send('Miscellaneous Page!');
});

router.get("/rihanna", function (req, res) {
    res.send('Work work work work work');
});

router.get("/bigfoot", function (req, res) {
    console.log(req.params);
    if (req.query.blurry) {
        res.send(`It's not the photographer's fault. Bigfoot is blurry, and that's extra scary to me. There's a large, out-of-focus monster roaming the countryside. Run! He's fuzzy! Get out of there!`);
    } else {
        res.send(`A group of researchers have amassed evidence that the legendary Bigfoot is real, ABC News reported, with the scientists presenting reams of evidence.`)
    }
});

router.get("/sightings", function (req, res) {
    console.log(req.params);
    var responseObject = `{
                            state: ${req.query.state}, 
                            sights: ${req.query.sights}
                          }`;
    res.send(`How many ufo sightings do you think there are in ${req.query.state}? ${req.query.sights}.`);
});

router.get('/favorite-foods', function (req, res) {
    var favoriteFoods = ["Jeni's Almond Butter ice cream", 'Tacos from Superica', 'A Breakfast Sandwich from Gjelina to go in Venice', 'Croissants from Bottega Louie in Downtown Los Angeles', 'Pizza from Little Star in San Francisco'];
    res.render('favorite-foods', {
        data: favoriteFoods
    });
});

router.get("/food/:food", function (req, res) {
    console.log(req.params);
    res.send(`I really love ${req.params.food}!`);
});

router.get('/favorite/:noun', function (req, res) {
    res.send(`I have a favorite ${req.params.noun}, it is ${req.query.noun}.`);
});

module.exports = router;