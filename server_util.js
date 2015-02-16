var send = require('send'),
    template = require('./template');

exports.staticFile = function(file) {
    return function(req, res){
        send(req, __dirname + '/static/' + file, {
          maxAge: 24 * 60 * 60 * 1000 // day
        }).pipe(res);
    };
};

var ETag;
exports.page = function(name, args, options) {
    !options && (options = {});

    var data = template.render(name, args);

    var cacheOptions = {
        etag: ETag,
        lastModified: new Date(),
        maxAge: 18 * 60 * 60
    };
  
    return function(req, res) {
        if (res.endIfCached(cacheOptions)) return;

        options.mime && res.mime(options.mime);

        res.cache(cacheOptions).end(data);
    };
};
exports._pageLocal = function(name, args, options) {
    !options && (options = {});
    return function(req, res) {
        options.mime && res.mime(options.mime);
        res.end(template._renderLocal(name, args));
    };
};

exports.start = function(callback) {
    require('crypto').pseudoRandomBytes(8, function(ex, buf) {
        if (ex) return callback(ex);

        ETag = buf.toString('hex');

        callback();
    });
};
