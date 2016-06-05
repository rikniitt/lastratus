require('shelljs/global');
var fs = require('fs');

var escapeshellarg = function(arg) {
  //  discuss at: http://phpjs.org/functions/escapeshellarg/
  // original by: Felix Geisendoerfer (http://www.debuggable.com/felix)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: escapeshellarg("kevin's birthday");
  //   returns 1: "'kevin\\'s birthday'"

  var ret = '';

  ret = arg.replace(/[^\\]'/g, function(m, i, s) {
    return m.slice(0, 1) + '\\\'';
  });

  return "'" + ret + "'";
};

var containers = {};

containers.getAll = function() {
  var list = [];
  var result = exec('sudo /web-frontend/bin/vz_scripts/list_containers.sh'/*, {silent: true}*/);

  if (result.code === 0) {
    var lines = result.output.split("\n");
    lines.forEach(function(line) {
      if (line !== '' && line.indexOf('CTID') === -1) {
        var values = line.split(/\s{1,}/);
        list.push({
          ctid: values[1],
          status: values[3],
          ip: values[4],
          hostname: values[5]
        });
      }
    });
  }

  return list;
};

containers.nextContainerId = function() {
  var conts = containers.getAll();
  var ids = conts.map(function(c) {
    return parseInt(c.ctid, 10);
  });
  ids.sort();
  if (ids.length > 0) {
    var last = ids[ids.length - 1];
    return (last >= 101) ? last + 1 : 101;
  } else {
    return 101;
  }
};


containers.start = function(ctid, onDataCb, endCb) {
  var id = parseInt(ctid, 10);
  if (id > 100) {
    var script = exec('sudo /web-frontend/bin/vz_scripts/manage_container.sh start ' + id, {async: true});
    script.stdout.on('data', onDataCb);
    script.stdout.on('end', endCb);
  } else {
    onDataCb('FAILED');
    endCb();
  }
};

containers.stop = function(ctid, onDataCb, endCb) {
  var id = parseInt(ctid, 10);
  if (id > 100) {
    var script = exec('sudo /web-frontend/bin/vz_scripts/manage_container.sh stop ' + id, {async: true});
    script.stdout.on('data', onDataCb);
    script.stdout.on('end', endCb);
  } else {
    onDataCb('FAILED');
    endCb();
  }
};

containers.restart = function(ctid, onDataCb, endCb) {
  var id = parseInt(ctid, 10);
  if (id > 100) {
    var script = exec('sudo /web-frontend/bin/vz_scripts/manage_container.sh restart ' + id, {async: true});
    script.stdout.on('data', onDataCb);
    script.stdout.on('end', endCb);
  } else {
    onDataCb('FAILED');
    endCb();
  }
};

containers.create = function(params, onDataCb, endCb) {
  var ctid = parseInt(params.ctid, 10);
  var template = params.template.replace(/\s/g, '_');
  template = escapeshellarg(template);
  var ip = (params.ip.match(/^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/)) ? params.ip : '0';
  ip = escapeshellarg(ip);
  var hostname = params.hostname.replace(/^\s+|\s+$/g, '').replace(/\s/g, '_');
  hostname = escapeshellarg(hostname);
  var rootpassword = params.rootpassword.replace(/^\s+|\s+$/g, '').replace(/\s/g, '_');
  rootpassword = escapeshellarg(rootpassword);
  var command = 'sudo /web-frontend/bin/vz_scripts/new_container.sh ' + ctid + ' ' + template + ' ' + ip + ' ' + hostname + ' ' + rootpassword;
  var script = exec(command, {async: true});
  script.stdout.on('data', onDataCb);
  script.stdout.on('end', endCb);
};

containers.getConfig = function(ctid) {
  var id = parseInt(ctid, 10);
  var config = {};
  var filePath = '/etc/vz/conf/' + id + '.conf';
  try {
    var stats = fs.lstatSync(filePath);
    if (stats.isFile()) {
      var configContent = fs.readFileSync(filePath).toString();

      var lines = configContent.split('\n');
      lines.forEach(function(line) {
        var parts = line.split('=');
        if (parts.length == 2) {
          var k = parts[0].replace(/^\s+|\s+$/g, '');
          var v = parts[1].replace(/^\s+|\s+$/g, '');
          config[k] = v;
        }
      });
    }
  }
  catch (e) {
    console.log(e);
  }
  
  return config;
};


module.exports = containers;
