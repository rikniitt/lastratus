var express = require('express');
var router = express.Router();
var containers = require('../services/containers');
var templates = require('../services/templates');
var ips = require('../services/ips');
var execprinter = require('../helpers/execprinter');

router.get('/', function(req, res, next) {
  var list = containers.getAll();
  res.render('containers-list', {containers: list});
});

router.get('/start/:ctid', function(req, res, next) {
  var id = parseInt(req.params.ctid, 10);
  var cbs = execprinter.createHandlers(req, res);
  containers.start(id, cbs.onDataCallback, cbs.onEndCallback);
});

router.get('/stop/:ctid', function(req, res, next) {
  var id = parseInt(req.params.ctid, 10);
  var cbs = execprinter.createHandlers(req, res);
  containers.stop(id, cbs.onDataCallback, cbs.onEndCallback);
});

router.get('/restart/:ctid', function(req, res, next) {
  var id = parseInt(req.params.ctid, 10);
  var cbs = execprinter.createHandlers(req, res);
  containers.restart(id, cbs.onDataCallback, cbs.onEndCallback);
});

router.get('/new', function(req, res, next) {
  res.render('containers-new', {
    templates: templates.getAll(),
    ips: ips.getAvailableIpAddresses(),
    nextCtid: containers.nextContainerId()
  });
});

router.post('/create', function(req, res, next) {
  var params = {
    ctid: req.body.ctid,
    template: req.body.template,
    ip: req.body.ip,
    hostname: req.body.hostname,
    rootpassword: req.body.rootpwd
  };
  var cbs = execprinter.createHandlers(req, res);
  containers.create(params, cbs.onDataCallback, cbs.onEndCallback);
});

router.get('/show/:ctid', function(req, res, next) {
  var id = parseInt(req.params.ctid, 10);
  res.render('containers-show', {
    ctid: id,
    config: containers.getConfig(id)
  });
});

module.exports = router;
