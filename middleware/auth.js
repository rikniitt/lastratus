var basicAuth = require('basic-auth');

var auth = {};

var authorizedUsers = {
  'admin': 'password'
};

auth.requireValidUser = function(req, res, next) {
  var user = basicAuth(req);

  if (!user || !authorizedUsers[user.name] || authorizedUsers[user.name] !== user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  }
  next();
};


module.exports = auth;
