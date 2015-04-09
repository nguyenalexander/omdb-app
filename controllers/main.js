var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req,res){
  var user = req.getUser();
  res.render('main/index', {user:user});
})

module.exports = router;