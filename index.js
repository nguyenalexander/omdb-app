var express = require('express');
var app = express();
var moviesCtrl = require('./controllers/movies');
var favouritesCtrl = require('./controllers/favourites');
var db = require('./models');
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'ejs');
app.use('/movies', moviesCtrl);
app.use('/favourites', favouritesCtrl);
app.use(express.static(__dirname + "/public"));

app.get('/', function(req,res){
  res.render('index');
})

app.listen(process.env.PORT || 3001, function(){
  console.log("Hello, server is up and running.");
})