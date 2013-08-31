module.exports = arrayPrefix('images/tags/', [
    '2013-04-30-root.png', '2013-05-01-join.png',
    '2013-05-04-me.png', '2013-05-04-find.png'
]).concat('images/soon/soon.png');

function arrayPrefix(pre, array) {
    return array.map(prefix(pre));
}

function prefix(pre) {
    return function(str) {
        return pre + str;
    };
}
