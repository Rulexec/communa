var photon = require('photon'),
    serverUtil = require('./server_util'),

    awsFile = serverUtil.awsFile,
    webFile = serverUtil.webFile,
    page = serverUtil.page,

    projects = require('./data/projects');

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
    '/': page('index.html', {projects: projects.list}),
    '/favicon.ico': awsFile('favicon.ico'),

    '/projects/': page('projects.html', {projects: projects.status}),

    '/people/ruliov': page('people/ruliov.html')
});

projects.list.forEach(function(project) {
    app.get('/projects/' + project.id, page('projects/' + project.id + '.html'));
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
