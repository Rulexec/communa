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
function page(name) {
    var data = generate.render(name);
    return function(req, res) {
        res.end(data);
    };
}

var app;

function start() {

app = express();
app.get('/', page('index.html'));

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

    start();

    app.listen(options.port);
}
