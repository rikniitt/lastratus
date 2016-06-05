require('shelljs/global');


var configure = {};

configure.getAllConfigScripts = function() {
  var scripts = ls('-R', '/web-frontend/bin/vz_scripts/configure');
  var filtered = scripts.filter(function(s) {
    return (s.match(/\.sh$/));
  });
  return filtered;
};

configure.runScript = function(ctid, script, onDataCb, endCb) {
  var id = parseInt(ctid, 10);
  var scriptPart = script.replace(/\.\./g, '/').replace(/'/g, "\\'");
  var scriptPath = '/web-frontend/bin/vz_scripts/configure/' + script;
  var command = 'sudo /web-frontend/bin/vz_scripts/run_script_in_container.sh ' + id + ' ' + scriptPath;
  var script = exec(command, {async: true});
  script.stdout.on('data', onDataCb);
  script.stdout.on('end', endCb);
};  

module.exports = configure;
