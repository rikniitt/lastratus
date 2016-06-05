require('shelljs/global');

var ips = {};

ips.getIpAddressesInLan = function() {
  var result = exec('/web-frontend/bin/vz_scripts/list_lan_ips.sh');
  var lines = result.output.split("\n");
  var resultLines = [];
  lines.forEach(function(l) {
    if (l !== '') {
      resultLines.push(l.replace(/^\s+|\s+$/g, ''));
    }
  });
  return resultLines;
};

ips.getAvailableIpAddresses = function() {
  var ipsInUse = ips.getIpAddressesInLan();
  var allIps = [];
  for (var i = 1; i < 250; i++) {
    allIps.push('192.168.0.' + i);
  }
  ipsInUse.forEach(function(ip) {
    var index = allIps.indexOf(ip);
    if (index !== -1) {
        allIps.splice(index, 1);
    }
  });
  return allIps;
}

module.exports = ips;
