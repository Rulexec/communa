var nunjucks = require('nunjucks'),

    CONFIG = require('./config');

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('templates'));

var cache = {};

exports.render = function(name, args) {
    args === undefined && (args = {});
    args.analytics = !CONFIG.LOCAL;

    var cached = cache[name];

    if (cached === undefined) {
        cached = cache[name] = env.getTemplate(name);
    }

    return cached.render(args);
};
exports._renderLocal = function(name, args) {
    args === undefined && (args = {});
    args.analytics = false;
    return env.getTemplate(name).render(args);
};
