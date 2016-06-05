var execprinter = {};


execprinter.createHandlers = function (req, res, redirectLocation) {

  redirectLocation = redirectLocation || '/containers';

  res.write('<html><head></head><body style="margin:0;padding:0;background-color:black;color:white;"><pre style="padding:2px;position:absolute;bottom:0;">');

  var onDataCallback = function(chunk) {
    res.write(chunk);
  };

  var onEndCallback = function() {
    res.write('</pre>');
    setTimeout(function() {
      res.end('<script>' +
        'window.location.href = "' + redirectLocation + '";'
        + '</script></body></html>');
    }, 2000);
  };

  return {
    onDataCallback: onDataCallback,
    onEndCallback: onEndCallback
  };
};


module.exports = execprinter;
