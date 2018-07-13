'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const filter_base_1 = require("./filter_base");
const util_1 = require("./util");
const config_1 = require("./config");
class FilterLineByConfigFile extends filter_base_1.FilterLineBase {
    constructor() {
        super(...arguments);
        this._configType = '';
        // general
        this._flag = ""; // flag is global
    }
    getConfigFilePath(filepath) {
        const fs = require('fs');
        var path = require('path');
        let dirname = path.dirname(filepath);
        let files = [];
        files.push(path.join(dirname, 'filterline.eoml'));
        files.push(path.join(dirname, 'filterline.json'));
        files.push(path.join(dirname, '.vscode/filterline.eoml'));
        files.push(path.join(dirname, '.vscode/filterline.json'));
        dirname = path.dirname(dirname);
        files.push(path.join(dirname, 'filterline.eoml'));
        files.push(path.join(dirname, 'filterline.json'));
        files.push(path.join(dirname, '.vscode/filterline.eoml'));
        files.push(path.join(dirname, '.vscode/filterline.json'));
        dirname = path.dirname(dirname);
        files.push(path.join(dirname, 'filterline.eoml'));
        files.push(path.join(dirname, 'filterline.json'));
        files.push(path.join(dirname, '.vscode/filterline.eoml'));
        files.push(path.join(dirname, '.vscode/filterline.json'));
        // console.log(files);
        let configpath = undefined;
        for (let file of files) {
            if (fs.existsSync(file)) {
                configpath = file;
                break;
            }
        }
        console.log(configpath);
        return configpath;
    }
    prepare(callback) {
        if (this._filePath === undefined) {
            callback(false);
            return;
        }
        let configPath = this.getConfigFilePath(this._filePath);
        if (configPath === undefined) {
            callback(false);
            return;
        }
        let configReader = new config_1.FilterConfigReader();
        configReader.read(configPath, (succeed, errorinfo) => {
            if (!succeed) {
                this.showError(errorinfo);
                callback(false);
                return;
            }
            this._config = configReader.getConfig();
            this._configType = configReader.getConfigType();
            console.log('fixed config:');
            console.log(this._config);
            callback(true);
        });
    }
    matchLine(line) {
        if (this._configType === 'general') {
            return this.matchLineGeneral(line);
        }
        else if (this._configType === 'stringlist') {
            return this.matchLineStringList(line);
        }
        else if (this._configType === 'regexlist') {
            return this.matchLineRegexList(line);
        }
        else if (this._configType === 'stringlist_notcontainany') {
            return this.matchLineStringListNotContainAny(line);
        }
        else if (this._configType === 'regexlist_notmatchany') {
            return this.matchLineRegexListNotMatchAny(line);
        }
        return undefined;
    }
    matchLineStringList(line) {
        for (let rule of this._config['rules']) {
            if (line.indexOf(rule) !== -1) {
                return line;
            }
        }
        return undefined;
    }
    matchLineStringListNotContainAny(line) {
        for (let rule of this._config['rules']) {
            if (line.indexOf(rule) !== -1) {
                // contain 
                return undefined;
            }
        }
        return line;
    }
    matchLineRegexList(line) {
        for (let rule of this._config['rules']) {
            let res = line.match(rule);
            if (res) {
                return line;
            }
        }
        return undefined;
    }
    matchLineRegexListNotMatchAny(line) {
        for (let rule of this._config['rules']) {
            let res = line.match(rule);
            if (res) {
                return undefined;
            }
        }
        return line;
    }
    matchLineGeneral(line) {
        if (this._config === undefined) {
            return undefined;
        }
        if (this._untilRegex) {
            // return the original line until find the match line 
            if (!line.match(this._untilRegex)) {
                return line;
            }
            // Ok , got the line
            this._untilRegex = undefined;
            return line;
        }
        let prefixstring = '';
        let content = line;
        let prefix_regex = this._config['_prefix_regex'];
        // console.log('----------------------');
        // console.log('prefix regex : ' + prefix_regex);
        // console.log('line : ' + line);
        if (prefix_regex) {
            let res = line.match(prefix_regex);
            // console.log('prefix match :' + res);
            // console.log('line :' + line);
            // not match prefix , just return (except until)
            if (!res) {
                return undefined;
            }
            if (res.length > 1) {
                for (let idx = 1; idx < res.length - 1; idx++) {
                    prefixstring += util_1.padWithBlank(res[idx], 8);
                    prefixstring += ' ';
                }
                content = res[res.length - 1];
                content = content.trim();
            }
        }
        // console.log('>new line');
        // console.log('prefix : ' + prefixstring);
        // console.log('content : ' + content);
        for (let rule of this._config['rules']) {
            let src_regex = rule['_src_regex'];
            let dest = rule['dest'];
            let tag = rule['tag'];
            let flag = rule['flag'];
            let until_regex = rule['_until_regex'];
            // try match
            let result = content.match(src_regex);
            if (!result) {
                // console.log('result is undefine');
                // console.log('reg = ' + src_regex);
                // console.log('line = ' + content);
                continue;
            }
            // global flag
            if (flag !== undefined) {
                this._flag = flag;
            }
            // tag
            if (tag === undefined) {
                tag = '';
            }
            // Now, it match , check the until regex
            if (until_regex) {
                this._untilRegex = until_regex;
            }
            // Print the content
            let flagstring = this._flag;
            let tagstring = tag;
            let contentstring = '';
            if (dest) {
                // dest with part
                contentstring = dest;
                // has group
                if (result.length > 1) {
                    for (let idx = 0; idx < result.length; idx++) {
                        if (idx === 0) {
                            continue;
                        }
                        contentstring += ' ';
                        contentstring += result[idx];
                    }
                }
            }
            else {
                // no dest field, just use content
                contentstring = content;
            }
            flagstring = util_1.padWithBlank(flagstring, 4);
            tagstring = util_1.padWithBlank(tagstring, 4);
            return prefixstring + ' ' + flagstring + ' ' + tagstring + ' ' + contentstring;
        }
        return undefined;
    }
    dispose() {
    }
}
exports.FilterLineByConfigFile = FilterLineByConfigFile;
//# sourceMappingURL=filter_configfile.js.map