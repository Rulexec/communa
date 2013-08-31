var config;

module.exports = config = {
    LOCAL: Boolean(process.env.LOCAL) && process.env.LOCAL !== 'false',
    PORT: process.env.PORT || 5000,

    HOST: process.env.LOCAL_HOST || 'com.muna.by',
    PROTOCOL: 'http://'
};
