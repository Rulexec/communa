var photon = require('photon'),
    serverUtil = require('./server_util'),

    awsFile = serverUtil.awsFile,
    webFile = serverUtil.webFile,
    page = serverUtil.page;

exports.start = function(options, callback) {

if (options.local) {
    // replace aws redirect to local file send
    // and replace page function to non-caching version
    awsFile = webFile;
    page = serverUtil._pageLocal;
}

var app = photon(
).use(photon.common()
).extend(photon.routing());

app.routeStatic({
    '/': page('index.html'),
    '/favicon.ico': awsFile('favicon.ico'),

    '/projects/': page('projects.html'),

    '/projects/tags': page('projects/tags.html'),
    '/projects/codechat': page('projects/codechat.html'),
    '/projects/code_hardcorius': page('projects/code_hardcorius.html'),
    '/projects/wiki.js': page('projects/wiki.js.html'),
    '/projects/codex_hardcorius': page('projects/codex_hardcorius.html'),

    '/people/ruliov': page('people/ruliov.html')
});

app.get(/^.*$/, error404);
app.use(function(req, res, next) {
    res.status(405).end('405');
});

function error404(req, res) {
    res.status(404).end('404');
}

serverUtil.start(function(error) {
    if (error) return callback(error);

    app.listen(options.port);
});

};
