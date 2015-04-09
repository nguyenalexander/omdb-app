var express = require('express');
var app = express();
var db = require('./models');
var bodyParser = require("body-parser")
var session = require("express-session")
var flash = require('connect-flash');
app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(session({ secret: 'this is the secret', resave: false, saveUninitialized: true}))
app.use(flash());
app.use(function(req,res,next){
  req.getUser = function(){
    return req.session.user || false;
  }
  next();
});

app.use('/main', require('./controllers/main'))
app.use('/movies', require('./controllers/movies'));
app.use('/favourites', require('./controllers/favourites'));

app.listen(process.env.PORT || 3001, function(){
  console.log("Hello, server is up and running.");
})