var express = require('express');
var app = express();
var moviesCtrl = require('./controllers/movies');

app.set('view engine', 'ejs');
app.use('/movies', moviesCtrl);
app.use(express.static(__dirname + "/public"));

app.get('/', function(req,res){
  res.render('index');
})



app.listen(process.env.PORT || 3000){
  console.log("Hello, server is up and running.");
}
})