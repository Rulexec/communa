var server = require('./server'),
    CONFIG = require('./config');

server.start({
    port: CONFIG.PORT,
    local: CONFIG.LOCAL
});
