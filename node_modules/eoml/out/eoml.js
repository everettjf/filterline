'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Everett's Obvious, Minimal Language
class EOML {
    constructor() {
        this._value = {};
        this._isArrayMode = false;
        this._currentArrayKey = '';
        this._lastKey = '';
    }
    parse(filePath, callback) {
        const readline = require('readline');
        const fs = require('fs');
        if (!fs.existsSync(filePath)) {
            callback(false, 'file not exist');
            return;
        }
        const rl = readline.createInterface({
            input: fs.createReadStream(filePath)
        });
        rl.on('line', (line) => {
            // for each trimmed line
            let trimmedline = line.trim();
            if (trimmedline.length === 0) {
                return;
            }
            // console.log('line:' + line);
            // ignore line that begins with //
            if (trimmedline.startsWith('#')) {
                return;
            }
            if (trimmedline === '[') {
                // only flag into array mode , and read next line
                this._isArrayMode = true;
                this._currentArrayKey = this._lastKey;
                this._currentArrayItem = {};
                this._value[this._currentArrayKey] = [];
                return;
            }
            else if (trimmedline === '-') {
                // end current array item , will into next array item
                if (this._currentArrayKey.length > 0 && this._currentArrayItem) {
                    this._value[this._currentArrayKey].push(this._currentArrayItem);
                    this._currentArrayItem = {};
                }
                return;
            }
            else if (trimmedline === ']') {
                // end current array item , will into next array item
                if (this._currentArrayKey.length > 0 && this._currentArrayItem) {
                    console.log('got ]');
                    console.log(this._currentArrayItem);
                    console.log(Object.keys(this._currentArrayItem).length);
                    if (Object.keys(this._currentArrayItem).length > 0) {
                        this._value[this._currentArrayKey].push(this._currentArrayItem);
                    }
                    this._currentArrayItem = {};
                }
                // end array mode
                this._currentArrayKey = '';
                this._isArrayMode = false;
                return;
            }
            let parts = eoml_split(trimmedline, ':');
            if (parts === undefined) {
                // no kv, so check if array mode
                // if array node , directly push as string
                if (this._isArrayMode) {
                    this._currentArrayItem = undefined;
                    this._value[this._currentArrayKey].push(trimmedline);
                }
                return;
            }
            let k = parts[0].trim();
            let v = parts[1].trim();
            // console.log('k=',k);
            // console.log('v=',v);
            if (this._isArrayMode) {
                // array mode : set the cached array item
                this._currentArrayItem[k] = v;
            }
            else {
                // set the 1st level
                this._value[k] = v;
            }
            this._lastKey = k;
        }).on('close', () => {
            // console.log('read complete');
            callback(true, '');
        });
    }
    getValue() {
        return this._value;
    }
}
exports.EOML = EOML;
function eoml_split(str, sep) {
    let index = str.indexOf(sep);
    // no sep
    if (index === -1) {
        return undefined;
    }
    let ret = ['', ''];
    ret[0] = str.substr(0, index);
    ret[1] = str.substr(index + sep.length, str.length);
    return ret;
}
exports.eoml_split = eoml_split;
//# sourceMappingURL=eoml.js.map