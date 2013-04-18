var nunjucks = require('nunjucks');

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('templates'));

exports.render = function(name) {
    return env.getTemplate(name).render();
};

if (require.main === module) {
}
