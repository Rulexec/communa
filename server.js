var photon = require('photon'),
    serverUtil = require('./server_util'),

    awsFile = serverUtil.awsFile,
    staticFile = serverUtil.staticFile,
    page = serverUtil.page,

    projects = require('./data/projects');

exports.start = function(options, callback) {

if (options.local) {
    // replace aws redirect to local file send
    // and replace page function to non-caching version
    awsFile = staticFile;
    page = serverUtil._pageLocal;
}

var app = photon(
).use(photon.hostRedirect(options.host)
).use(photon.common()
).use(photon.path()
).use(photon.mime('text/html', 'utf-8')
).use(photon.cache()
).extend(photon.routing());

app.routeStatic({
    '/': page('index.html', {projects: projects.list}),
    '/favicon.ico': awsFile('favicon.ico'),
    '/robots.txt': page('robots.txt', {}, {mime: 'text/plain'}),

    '/projects/': page('projects.html', {projects: projects.status}),

    '/people/ruliov': page('people/ruliov.html'),

    '/landing/etc': page('landing/etc.html'),
    '/landing/project': page('landing/project.html')
});

// Landings with different ?queries (for statistics)
app.get(RegExp('/landing/etc(?:\\?.*)'), page('landing/etc.html'));

// Project pages
projects.list.forEach(function(project) {
    app.get('/projects/' + project.id, page('projects/' + project.id + '.html'));
});
// Static files
require('./data/static_files').forEach(function(file) {
    app.get('/static/' + file, awsFile(file));
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
