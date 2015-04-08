var express = require('express');
var favourites = express.Router();
var db = require('../models');
var request = require('request');
var bodyParser = require('body-parser')
favourites.use(bodyParser.urlencoded({extended: false}));

var renderDB = function (res) {
  db.favourite.findAll().then(function(favourites) {
    var favouritesArray = favourites.map(function(favourite) {
      return favourite.get();
    });
    res.locals.favourites = {favourite: favouritesArray};
    res.render("favourites/index");
  })
}

// var renderDBdata = function (req,res) {
//   db.favourite.find({where:{id:req.params.id}}).then(function(favourites) {
//     var favouritesArray = favourites.map(function(favourite) {
//       return favourite.get();
//     });
//     console.log(favouritesArray)
//     res.locals.data = {favourite: favouritesArray};
//     res.render("favourites/comments");
//   })
// }

favourites.get('/', function(req,res){
  renderDB(res)
})

favourites.get('/:id', function(req,res){
  db.favourite.find({where:{id:req.params.id}}).then(function(data){
    var movieData = data.get();
    res.redirect("/movies/"+movieData.imdbId)
  })
})

favourites.post('/', function(req,res){
  db.favourite.findOrCreate({where: {title:req.body.title,year:req.body.year,poster:req.body.poster,imdbId:req.body.imdbID}})
  .spread(function(data,created){
    renderDB(res, created)
  }).then(function(data){
    res.send(data);
  })
})

favourites.post('/:id/comments', function(req,res){
  db.favourite.find({where:{id:req.params.id}})
  .then(function(createdMovie){
    createdMovie.createComment({commentBody: req.body.comment})
    .then(function(createdComment){
      console.log("this is the created comment:",createdComment)
      res.send(createdComment)
    })
  })
})

favourites.get('/:id/comments', function(req,res){
  db.favourite.find({where:{id:req.params.id}})
  .then(function(createdMovie){
    db.comment.findAll({where:{favouriteId:createdMovie.id}})
    .then(function(allComments){
      db.comment.count({where:{favouriteId:createdMovie.id}})
      .then(function(commentCount){
        res.locals.commentCounter = commentCount;
        res.render('favourites/comments', {data: createdMovie, comments: allComments})
      })
    })
  })
})
favourites.delete("/:id", function(req,res) {
  db.favourite.find({where:{imdbId:req.params.id}}).then(function(data){
    var data = data.get();
    db.favourite.destroy({where:{imdbId:data.imdbId}}).then(function() {
      res.send({result:true})
    });
  })
});

module.exports = favourites;