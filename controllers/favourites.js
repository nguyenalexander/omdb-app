var express = require('express');
var favourites = express.Router();
var db = require('../models');
var request = require('request');
var bodyParser = require('body-parser')
favourites.use(bodyParser.urlencoded({extended: false}));

var renderDB = function (res) {
  db.favourite.findAll().then(function(favourites) {
    var favouritesArray = favourites.map(function(favourite) {
      return {imdbID: favourite.imdbId, Title: favourite.title, Year: favourite.year, Poster: favourite.poster};
    });
    res.locals.favourites = {favourite: favouritesArray};
    res.render("favourites/index");
  })
}

favourites.get('/', function(req,res){
  renderDB(res)
})

favourites.post('/', function(req,res){
  db.favourite.findOrCreate({where: {title:req.body.title,year:req.body.year,poster:req.body.poster,imdbId:req.body.imdbID}}).spread(function(data){
    renderDB(res)
  })
})


favourites.post("/delete", function(req, res) {
  db.favourite.destroy({where: {imdbId:req.body.imdbID}}).then(function() {
    renderDB(res);
  });
});

module.exports = favourites;