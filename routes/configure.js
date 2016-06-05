var express = require('express');
var router = express.Router();
var configure = require('../services/configure');
var containers = require('../services/containers');
var execprinter = require('../helpers/execprinter');


router.get('/', function(req, res, next) {
  res.render('configure', {
    containers: containers.getAll(),
    scripts: configure.getAllConfigScripts()
  });
});

router.post('/run', function(req, res, next) {
  var id = parseInt(req.body.ctid);
  var script = req.body.confscript;
  var cbs = execprinter.createHandlers(req, res, '/configure');
  configure.runScript(id, script, cbs.onDataCallback, cbs.onEndCallback);
});


module.exports = router;
