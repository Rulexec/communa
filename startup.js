var server = require('./server');

var LOCAL = Boolean(process.env.LOCAL) && process.env.LOCAL !== 'false';
var PORT = process.env.PORT || 5000;

server.start({
    port: PORT,
    local: LOCAL
});
