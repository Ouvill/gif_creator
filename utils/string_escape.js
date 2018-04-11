module.exports.escape = function (string) {
    if (typeof string !== 'string') {
        return string;
    } return string.replace(/[&'`"<>]/g, function (match) {
        return {
            '&': '&amp;',
            "'": '&#x27;',
            '`': '&#x60;',
            '"': '&quot;',
            '<': '&lt;',
            '>': '&gt;',
        }[match]
    });
}

module.exports.bash_escape = function (string) {
    if (typeof string !== 'string') {
        return string;
    } return string.replace(/[&'`"<>]/g, function (match) {
        return {
            '&': '&amp;',
            "'": '&#x27;',
            '`': '&#x60;',
            '"': '&quot;',
            '<': '&lt;',
            '>': '&gt;',
            ';': '；',
            '|': '｜',
            '*': '＊',
            '?': '？',
            '(': '（',
            ')': '）',
            '[': '［',
            ']': '］',
            '!': '！',
            '$': '＄',
            '{': '｛',
            '}': '｝'
        }[match]
    });
}

module.exports.linefeed_to_br = function (string) {
    if (typeof string !== 'string') {
        return string;
    } return string.replace(/\r\n|\n|\r/g, "<br>");
}
