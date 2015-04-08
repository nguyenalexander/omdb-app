var db = require('./models');

db.comment.create({commentBody:"This is the comment"})

db.favourite.find({where:{id:65}})
  .then(function(createdMovie){
    createdMovie.createComment({commentBody: "This movie sucks assholes"})
      .then(function(createdComment){
        console.log(createdComment)
      })
          })
