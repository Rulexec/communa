var server = require('./server'),
    CONFIG = require('./config');

server.start({
    port: CONFIG.PORT,
    local: CONFIG.LOCAL,

    host: CONFIG.HOST
}, function(error) {
    if (error) {
        console.log('ERROR', error);
        process.exit(1);
    }
});

process.on('SIGTERM', function() {
    console.log('bye!');
    process.exit(0);
});
