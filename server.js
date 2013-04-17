var express = require('express'),
    fs = require('fs'),
    send = require('send'),

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

var app;

function start() {

app = express();
app.get('/', webFile('index.html'));

app.get('/projects/wiki.js', webFile('projects/wiki.js.html'));
app.get('/projects/codex_hardcorius', webFile('projects/codex_hardcorius.html'));

app.get('/people/ruliov', webFile('people/ruliov.html'));

app.get('/favicon.ico', awsFile('favicon.ico'));

}

exports.start = function(options) {
    if (options.local) {
        awsFile = webFile;
    }

    start();

    app.listen(options.port);
}
