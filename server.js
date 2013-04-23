var express = require('express'),
    fs = require('fs'),
    send = require('send'),

    generate = require('./generate'),
    aws = require('./aws');

var awsFile = function(file) {
    return function(req, res) {
        res.status(301); // moved permanently
        res.location(aws.url(file))
        res.end();
    }
}
function webFile(file) {
    return function(req, res){
        send(req, __dirname + '/web/' + file
        ).maxage(24 * 60 * 60 * 1000 // day
        ).pipe(res);
    };
}

var ETag;
function page(name) {
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
}

var app;

function start() {

app = express();
app.get('/', page('index.html'));
app.get('/projects/', page('projects.html'));

app.get('/projects/tags', page('projects/tags.html'));
app.get('/projects/code_hardcorius', page('projects/code_hardcorius.html'));
app.get('/projects/wiki.js', page('projects/wiki.js.html'));
app.get('/projects/codex_hardcorius', page('projects/codex_hardcorius.html'));

app.get('/people/ruliov', page('people/ruliov.html'));

app.get('/favicon.ico', awsFile('favicon.ico'));

}

exports.start = function(options) {
    if (options.local) {
        awsFile = webFile;
        page = function(name) {
            return function(req, res) {
                var data = generate.render(name);
                res.end(data);
            };
        };
    }

    require('crypto').randomBytes(8, function(ex, buf) {
        ETag = buf.toString('hex');

        start();
        app.listen(options.port);
    });
}
