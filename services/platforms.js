require('shelljs/global');
var fs = require('fs');
var containers = require('../services/containers');
var configure = require('../services/configure');
var ips =  require('../services/ips');

var platforms = {};

platforms.createLamp = function(onDataCb, endCb) {
  var ctid = containers.nextContainerId();
  var ip = '192.168.0.' + ctid;

  // Check that ip is available, if not pick the last
  var availableIps = ips.getAvailableIpAddresses();
  if (availableIps.indexOf(ip) === -1) {
    ip = availableIps[availableIps.length - 1];
  }

  var params = {
    ctid: ctid,
    template: 'ubuntu-12.04-x86_64',
    ip: ip,
    hostname:'lamp-cnt-' + ctid,
    rootpassword: ''
  };

  // This beautiful cascading callback tree could be refactored
  // maybe with nimble or flow
  containers.create(params, onDataCb, function() {
    containers.start(ctid, onDataCb, function() {
      configure.runScript(ctid, 'ubuntu/locale.sh', onDataCb, function() {
        configure.runScript(ctid, 'ubuntu/apt_update.sh', onDataCb, function() {
          configure.runScript(ctid, 'ubuntu/basic_packages.sh', onDataCb, function() {
            configure.runScript(ctid, 'ubuntu/apache.sh', onDataCb, function() {
              configure.runScript(ctid, 'ubuntu/php.sh', onDataCb, function() {
                configure.runScript(ctid, 'ubuntu/mysql.sh', onDataCb, function() {
                  endCb();
                });
              });
            });
          });
        });
      });
    });
  });
};

platforms.createWP = function(onDataCb, endCb) {
  var ctid = containers.nextContainerId();
  var ip = '192.168.0.' + ctid;

  // Check that ip is available, if not pick the last
  var availableIps = ips.getAvailableIpAddresses();
  if (availableIps.indexOf(ip) === -1) {
    ip = availableIps[availableIps.length - 1];
  }

  var params = {
    ctid: ctid,
    template: 'ubuntu-12.04-x86_64',
    ip: ip,
    hostname:'wp-cnt-' + ctid,
    rootpassword: ''
  };

  // This beautiful cascading callback tree could be refactored
  // maybe with nimble or flow
  containers.create(params, onDataCb, function() {
    containers.start(ctid, onDataCb, function() {
      configure.runScript(ctid, 'ubuntu/locale.sh', onDataCb, function() {
        configure.runScript(ctid, 'ubuntu/apt_update.sh', onDataCb, function() {
          configure.runScript(ctid, 'ubuntu/basic_packages.sh', onDataCb, function() {
            configure.runScript(ctid, 'ubuntu/apache.sh', onDataCb, function() {
              configure.runScript(ctid, 'ubuntu/php.sh', onDataCb, function() {
                configure.runScript(ctid, 'ubuntu/mysql.sh', onDataCb, function() {
                  configure.runScript(ctid, 'ubuntu/wordpress.sh', onDataCb, function() {
                    endCb();
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};

platforms.createLamp55 = function(onDataCb, endCb) {
  var ctid = containers.nextContainerId();
  var ip = '192.168.0.' + ctid;

  // Check that ip is available, if not pick the last
  var availableIps = ips.getAvailableIpAddresses();
  if (availableIps.indexOf(ip) === -1) {
    ip = availableIps[availableIps.length - 1];
  }

  var params = {
    ctid: ctid,
    template: 'ubuntu-14.04-x86_64',
    ip: ip,
    hostname:'lamp-cnt-' + ctid,
    rootpassword: ''
  };

  // This beautiful cascading callback tree could be refactored
  // maybe with nimble or flow
  containers.create(params, onDataCb, function() {
    containers.start(ctid, onDataCb, function() {
      configure.runScript(ctid, 'ubuntu/locale.sh', onDataCb, function() {
        configure.runScript(ctid, 'ubuntu/apt_update.sh', onDataCb, function() {
          configure.runScript(ctid, 'ubuntu/basic_packages.sh', onDataCb, function() {
            configure.runScript(ctid, 'ubuntu/apache.sh', onDataCb, function() {
              configure.runScript(ctid, 'ubuntu/php.sh', onDataCb, function() {
                configure.runScript(ctid, 'ubuntu/mysql.sh', onDataCb, function() {
                  endCb();
                });
              });
            });
          });
        });
      });
    });
  });
};

platforms.createLaravel = function(onDataCb, endCb) {
  var ctid = containers.nextContainerId();
  var ip = '192.168.0.' + ctid;

  // Check that ip is available, if not pick the last
  var availableIps = ips.getAvailableIpAddresses();
  if (availableIps.indexOf(ip) === -1) {
    ip = availableIps[availableIps.length - 1];
  }

  var params = {
    ctid: ctid,
    template: 'ubuntu-14.04-x86_64',
    ip: ip,
    hostname:'laravel-cnt-' + ctid,
    rootpassword: ''
  };

  // This beautiful cascading callback tree could be refactored
  // maybe with nimble or flow
  containers.create(params, onDataCb, function() {
    containers.start(ctid, onDataCb, function() {
      configure.runScript(ctid, 'ubuntu/locale.sh', onDataCb, function() {
        configure.runScript(ctid, 'ubuntu/apt_update.sh', onDataCb, function() {
          configure.runScript(ctid, 'ubuntu/basic_packages.sh', onDataCb, function() {
            configure.runScript(ctid, 'ubuntu/apache.sh', onDataCb, function() {
              configure.runScript(ctid, 'ubuntu/php.sh', onDataCb, function() {
                configure.runScript(ctid, 'ubuntu/mysql.sh', onDataCb, function() {
                  configure.runScript(ctid, 'ubuntu/laravel.sh', onDataCb, function() {
                    endCb();
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};

platforms.createRails = function(onDataCb, endCb) {
  var ctid = containers.nextContainerId();
  var ip = '192.168.0.' + ctid;

  // Check that ip is available, if not pick the last
  var availableIps = ips.getAvailableIpAddresses();
  if (availableIps.indexOf(ip) === -1) {
    ip = availableIps[availableIps.length - 1];
  }

  var params = {
    ctid: ctid,
    template: 'ubuntu-14.04-x86_64',
    ip: ip,
    hostname:'rails-cnt-' + ctid,
    rootpassword: ''
  };

  // This beautiful cascading callback tree could be refactored
  // maybe with nimble or flow
  containers.create(params, onDataCb, function() {
    containers.start(ctid, onDataCb, function() {
      configure.runScript(ctid, 'ubuntu/locale.sh', onDataCb, function() {
        configure.runScript(ctid, 'ubuntu/apt_update.sh', onDataCb, function() {
          configure.runScript(ctid, 'ubuntu/basic_packages.sh', onDataCb, function() {
            configure.runScript(ctid, 'ubuntu/rails.sh', onDataCb, function() {
              endCb();
            });
          });
        });
      });
    });
  });
};

platforms.createMean = function(onDataCb, endCb) {
  var ctid = containers.nextContainerId();
  var ip = '192.168.0.' + ctid;

  // Check that ip is available, if not pick the last
  var availableIps = ips.getAvailableIpAddresses();
  if (availableIps.indexOf(ip) === -1) {
    ip = availableIps[availableIps.length - 1];
  }

  var params = {
    ctid: ctid,
    template: 'ubuntu-14.04-x86_64',
    ip: ip,
    hostname:'mean-cnt-' + ctid,
    rootpassword: ''
  };

  // This beautiful cascading callback tree could be refactored
  // maybe with nimble or flow
  containers.create(params, onDataCb, function() {
    containers.start(ctid, onDataCb, function() {
      configure.runScript(ctid, 'ubuntu/locale.sh', onDataCb, function() {
        configure.runScript(ctid, 'ubuntu/apt_update.sh', onDataCb, function() {
          configure.runScript(ctid, 'ubuntu/basic_packages.sh', onDataCb, function() {
            configure.runScript(ctid, 'ubuntu/mean.sh', onDataCb, function() {
              endCb();
            });
          });
        });
      });
    });
  });
};

platforms.createLemp = function(onDataCb, endCb) {
  var ctid = containers.nextContainerId();
  var ip = '192.168.0.' + ctid;

  // Check that ip is available, if not pick the last
  var availableIps = ips.getAvailableIpAddresses();
  if (availableIps.indexOf(ip) === -1) {
    ip = availableIps[availableIps.length - 1];
  }

  var params = {
    ctid: ctid,
    template: 'ubuntu-14.04-x86_64',
    ip: ip,
    hostname:'lemp-cnt-' + ctid,
    rootpassword: ''
  };

  // This beautiful cascading callback tree could be refactored
  // maybe with nimble or flow
  containers.create(params, onDataCb, function() {
    containers.start(ctid, onDataCb, function() {
      configure.runScript(ctid, 'ubuntu/locale.sh', onDataCb, function() {
        configure.runScript(ctid, 'ubuntu/apt_update.sh', onDataCb, function() {
          configure.runScript(ctid, 'ubuntu/basic_packages.sh', onDataCb, function() {
            configure.runScript(ctid, 'ubuntu/lemp.sh', onDataCb, function() {
              endCb();
            });
          });
        });
      });
    });
  });
};

module.exports = platforms;
