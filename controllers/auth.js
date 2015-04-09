var db = require('../models');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var bcrypt = require('bcrypt')


//GET /auth/login
//display login form
router.use(bodyParser.urlencoded({extended: false}));


router.get('/login',function(req,res){
    res.render('auth/login');
});

//POST /login
//process login data and login user
router.post('/login',function(req,res){
  db.user.find({where:{email:req.body.email}})
    .then(function(user){
      if (user){
        bcrypt.compare(req.body.password, user.password, function(err, result){
          if (err) {throw err;}
          if (result) {
            req.session.user = {
              id: user.id,
              email: user.email,
              username: user.username
            }
            res.redirect('/');
          }
          else {
            res.send('password is invalid')
          }
        })
      }
      else {
        res.send('User not found. Please sign up.')
      }
    })
    //do login here (check password and set session value)

    //user is logged in forward them to the home page
    // res.redirect('/');
});

//GET /auth/signup
//display sign up form
router.get('/signup',function(req,res){
    res.render('auth/signup');
});

//POST /auth/signup
//create new user in database
router.post('/signup',function(req,res){
  var userQuery = {email:req.body.email};
  var userData = {
    email:req.body.email,
    name:req.body.name,
    password:req.body.password
  };
  db.user.findOrCreate({where:userQuery,defaults:userData})
    .spread(function(createdUser,created){
      if (created){
        res.send('new user created.')
      }
      else {
        res.send('email already exists!')
      }
    })
    .catch(function(error){
      console.log('ERROR:',error)
      res.send(error.message);
    })
    //do sign up here (add user to database)

    //user is signed up forward them to the home page
    // res.redirect('/');
});

//GET /auth/logout
//logout logged in user
router.get('/logout',function(req,res){
  delete req.session.user;
  res.redirect('/');
});


module.exports = router;