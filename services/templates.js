require('shelljs/global');

var templates = {};

templates.getAll = function() {
  var result = exec('/web-frontend/bin/vz_scripts/list_templates.sh');
  var lines = result.output.split("\n");
  var resultLines = [];
  lines.forEach(function(l) {
    if (l !== '') {
      resultLines.push(l);
    }
  });
  return resultLines;
};

module.exports = templates;
