var express = require('express');
var router = express.Router();
var templates = require('../services/templates');

router.get('/', function(req, res, next) {
  var list = templates.getAll();
  res.render('templates-list', {templates: list});
});


module.exports = router;
