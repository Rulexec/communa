var nunjucks = require('nunjucks'),

    CONFIG = require('./config');

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('templates'));

exports.render = function(name) {
    return env.getTemplate(name).render({
        analytics: !CONFIG.LOCAL
    });
};
