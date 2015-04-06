var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/', function(req,res){
  var queryString = req.query.q;
  var url = "http://www.omdbapi.com/?s="+queryString;
  request(url, function(error, response, body){
    var movies = JSON.parse(body);
    if (!error && response.statusCode == 200){
      res.render('movies/index', movies);
    }
    else if (error || body.error){
      res.send('Sorry, you have an error!')
    }
  })

})

router.get('/:id', function(req,res){
  var idQueryString = req.params.id;
  var url = "http://www.omdbapi.com/?i="+idQueryString+"&tomatoes=true&plot=full";
  request(url, function(error, response, body){
    var idMovies = JSON.parse(body);
    if (!error && response.statusCode == 200){
      res.render('movies/show', idMovies);
    }
    else if (error || body.error){
      res.send('Sorry, you have an error!')
  }

router.get("/favourites", function(req, res) {
  res.render("movies/favourites", {favourite:[]});
});

})
})

module.exports = router;