'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function padWithBlank(str, length) {
    if (str.length > length) {
        return str;
    }
    let pad = '';
    for (let i = 0; i < length - str.length; i++) {
        pad += ' ';
    }
    return pad + str;
}
exports.padWithBlank = padWithBlank;
function readJsonFile(filePath) {
    var fs = require('fs');
    var content = fs.readFileSync(filePath);
    // console.log('content : ' + content);
    if (!content) {
        return undefined;
    }
    try {
        var json = JSON.parse(content);
        return json;
    }
    catch (e) {
        console.log('json parse error : ' + e);
    }
    return undefined;
}
exports.readJsonFile = readJsonFile;
//# sourceMappingURL=util.js.map