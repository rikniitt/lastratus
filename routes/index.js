var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var marked = require('marked');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Lastratus'});
});


router.get('/about', function(req, res, next) {
  fs.readFile(path.join(__dirname, '../README.md'), {encoding: 'utf-8'}, function(err, data) {
    if (err) {
      next(err);
    }
    res.render('index-about', {readme: marked(data)});
  });
});

module.exports = router;
