var express = require('express');
var router = express.Router();
var db = require('../models');

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

router.get('/', function(req,res){
  req.session.lastPage= "/"
  renderDB(res)
})

router.get('/:id', function(req,res){
  db.favourite.find({where:{id:req.params.id}}).then(function(data){
    var movieData = data.get();
    res.redirect("/movies/"+movieData.imdbId)
  })
})

router.post('/', function(req,res){
  db.favourite.findOrCreate({where: {title:req.body.title,year:req.body.year,poster:req.body.poster,imdbId:req.body.imdbID}})
  .spread(function(data,created){
    renderDB(res, created)
  })
})

router.post('/:id/comments', function(req,res){
  db.favourite.find({where:{id:req.params.id}})
  .then(function(createdMovie){
    createdMovie.createComment({commentBody: req.body.comment})
    .then(function(createdComment){
      res.send(createdComment)
    })
  })
})

router.get('/:id/comments', function(req,res){
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

router.delete("/:id", function(req,res) {
  db.favourite.find({where:{id:req.params.id}}).then(function(data){
    var data = data.get();
    db.favourite.destroy({where:{id:data.id}}).then(function() {
      console.log("this is the id",data.id)
      db.comment.destroy({where: {favouriteId:data.id}})
      res.send({result:true})
    });
  })
});

module.exports = router;