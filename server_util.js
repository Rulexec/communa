var send = require('send'),
    generate = require('./generate'),
    aws = require('./aws');

exports.awsFile = function(file) {
    return function(req, res) {
        res.status(301); // moved permanently
        res.location(aws.url(file))
        res.end();
    }
};

exports.webFile = function(file) {
    return function(req, res){
        send(req, __dirname + '/web/' + file
        ).maxage(24 * 60 * 60 * 1000 // day
        ).pipe(res);
    };
};

var ETag;
exports.page = function(name) {
    var data = generate.render(name);
    var createdDate = new Date().toUTCString();
    var maxAge = 2 * 24 * 60 * 60;
    var maxAgeHeader = 'public, max-age=' + maxAge.toString();
  
    return function(req, res) {
        if (!res.getHeader('ETag')) res.setHeader('ETag', ETag);
        if (!res.getHeader('Date')) res.setHeader('Date', new Date().toUTCString());
        if (!res.getHeader('Cache-Control')) res.setHeader('Cache-Control', maxAgeHeader);
        if (!res.getHeader('Last-Modified')) res.setHeader('Last-Modified', createdDate);

        res.end(data);
    };
};
exports._pageLocal = function(name) {
    return function(req, res) {
        res.end(generate.render(name));
    };
};

exports.start = function(callback) {
    require('crypto').pseudoRandomBytes(8, function(ex, buf) {
        if (ex) return callback(ex);

        ETag = buf.toString('hex');

        callback();
    });
};
