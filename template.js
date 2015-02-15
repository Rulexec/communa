var nunjucks = require('nunjucks'),

    CONFIG = require('./config'),
    staticUrl = function(url) { return CONFIG.PROTOCOL + CONFIG.HOST + '/static/' + url; };

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('templates'));

env.addFilter('subarray', function(arr, start, length) {
    if (length !== undefined) {
        return arr.slice(start, start + length);
    } else {
        return arr.slice(start);
    }
});

function addDefaultArgs(args) {
    merge(args, {
        analytics: !CONFIG.LOCAL,
        staticUrl: staticUrl
    });
}

var cache = {};

exports.render = function(name, args) {
    args === undefined && (args = {});
    addDefaultArgs(args);

    var cached = cache[name];

    if (cached === undefined) {
        cached = cache[name] = env.getTemplate(name);
    }

    return cached.render(args);
};
exports._renderLocal = function(name, args) {
    args === undefined && (args = {});
    addDefaultArgs(args);

    return env.getTemplate(name).render(args);
};

function merge(to, from) {
    for (var name in from) {
        if (from.hasOwnProperty(name) && to[name] === undefined) {
            to[name] = from[name];
        }
    }
}
