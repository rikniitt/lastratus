var express = require('express');
var router = express.Router();
var platforms = require('../services/platforms');
var execprinter = require('../helpers/execprinter');

router.get('/', function(req, res, next) {
  var list = [];
  res.render('platforms-list', {platforms: list});
});

router.post('/create/lamp', function(req, res, next) {
  var cbs = execprinter.createHandlers(req, res);
  platforms.createLamp(cbs.onDataCallback, cbs.onEndCallback);
});

router.post('/create/wp', function(req, res, next) {
  var cbs = execprinter.createHandlers(req, res);
  platforms.createWP(cbs.onDataCallback, cbs.onEndCallback);
});


router.post('/create/lamp55', function(req, res, next) {
  var cbs = execprinter.createHandlers(req, res);
  platforms.createLamp55(cbs.onDataCallback, cbs.onEndCallback);
});


router.post('/create/laravel', function(req, res, next) {
  var cbs = execprinter.createHandlers(req, res);
  platforms.createLaravel(cbs.onDataCallback, cbs.onEndCallback);
});


router.post('/create/rails', function(req, res, next) {
  var cbs = execprinter.createHandlers(req, res);
  platforms.createRails(cbs.onDataCallback, cbs.onEndCallback);
});


router.post('/create/mean', function(req, res, next) {
  var cbs = execprinter.createHandlers(req, res);
  platforms.createMean(cbs.onDataCallback, cbs.onEndCallback);
});


router.post('/create/lemp', function(req, res, next) {
  var cbs = execprinter.createHandlers(req, res);
  platforms.createLemp(cbs.onDataCallback, cbs.onEndCallback);
});


module.exports = router;
