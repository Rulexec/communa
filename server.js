var photon = require('ruliov-photon-legacy'),
    serverUtil = require('./server_util'),

    staticFile = serverUtil.staticFile,
    page = serverUtil.page;

function start(options, callback) {

if (options.local) {
    // replace page function to non-caching version
    page = serverUtil._pageLocal;
}

var app = photon(
).use(photon.hostRedirect(options.host)
).use(photon.common()
).use(photon.path()
).use(photon.mime('text/html', 'utf-8')
).use(photon.cache()
).extend(photon.routing());

var soonPage = page('index.html');

app.routeStatic({
    '/': soonPage,
    '/favicon.ico': staticFile('favicon.ico'),
    '/robots.txt': page('robots.txt', {}, {mime: 'text/plain'}),

    '/people/ruliov': page('ruliov.html')
});

// Static files
app.get(/^\/static\/(.+)/, function(req, res, file) {
  staticFile(file)(req, res);
});

var error404 = soonPage;

//app.get(/^.*$/, error404);
app.use(function(req, res, next) {
    if (req.method == 'GET') {
        error404(req, res);
    } else {
        res.status(405).end('405');
    }
});

app.listen(options.port);

};

exports.start = function(options, callback) {
    serverUtil.start(function(error) {
        if (error) return callback(error);

        start(options, callback);
    });
};
