var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');


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
  console.log(idMovies)
  if (!error && response.statusCode == 200){
    res.render('movies/show', idMovies);
  }
  else if (error || body.error){
    res.send('Sorry, you have an error!')
  }
})
})

router.delete('/:id', function(req,res){
  db.favourite.find({where:{imdbId:req.params.id}}).then(function(data){
    var data = data.get();
    db.favourite.destroy({where:{imdbId:data.imdbId}}).then(function() {
      res.send({result:true})
    });
  })
});

router.get("/favourites", function(req, res) {
  res.render("movies/favourites");
});


module.exports = router;