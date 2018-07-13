'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const eoml_1 = require("eoml");
const util_1 = require("./util");
class FilterConfigReader {
    constructor() {
        this._configPath = '';
        this._configType = '';
    }
    getConfig() {
        return this._config;
    }
    getConfigType() {
        return this._configType;
    }
    read(configPath, callback) {
        var path = require('path');
        var fs = require('fs');
        console.log('config path : ' + this._configPath);
        this._configPath = configPath;
        if (!fs.existsSync(this._configPath)) {
            callback(false, 'Can not locate config file ' + this._configPath);
            return;
        }
        let ext = path.extname(this._configPath);
        if (ext === '.json') {
            // json
            this._config = util_1.readJsonFile(this._configPath);
            if (!this._config) {
                callback(false, 'failed parse json file ' + this._configPath);
                return;
            }
            this.precompileConfig((succeed, errorinfo) => {
                callback(succeed, errorinfo);
            });
        }
        else {
            // eoml or txt
            let parser = new eoml_1.EOML();
            parser.parse(this._configPath, (succeed, errorinfo) => {
                if (!succeed) {
                    callback(false, 'parse file failed : ' + errorinfo);
                    return;
                }
                this._config = parser.getValue();
                this.precompileConfig((succeed, errorinfo) => {
                    console.log('precompiled result : ' + succeed);
                    callback(succeed, errorinfo);
                });
            });
        }
    }
    precompileConfig(callback) {
        if (!this._config) {
            callback(false, 'config is invalidate');
            return;
        }
        // field: type <must exist>
        console.log('config = ' + this._config);
        this._configType = this._config['type'];
        if (this._configType) {
            let supportedTypes = [
                'stringlist',
                'regexlist',
                'stringlist_notcontainany',
                'regexlist_notmatchany',
                'general',
            ];
            if (supportedTypes.indexOf(this._configType) === -1) {
                callback(false, 'supported type is stringlist/regexlist/general, regexlist is default if not specified');
                return;
            }
        }
        else {
            // default
            this._configType = 'regexlist';
            console.log('No config type specified, default to regexlist');
        }
        // field: rules <must exist>
        if (!this._config['rules']) {
            callback(false, 'No rules in config file ' + this._configPath);
            return;
        }
        console.log('config type : ' + this._configType);
        if (this._configType === 'stringlist' || this._configType === 'stringlist_notcontainany') {
            this.precompileAsStringList(callback);
        }
        else if (this._configType === 'regexlist' || this._configType === 'regexlist_notmatchany') {
            this.precompileAsRegexList(callback);
        }
        else if (this._configType === 'general') {
            this.precompileAsGeneral(callback);
        }
        else {
            console.log('Will not go here');
            callback(false, 'System error : should not go here');
        }
    }
    precompileAsStringList(callback) {
        if (!this._config) {
            callback(false, 'config is invalidate');
            return;
        }
        // all rule must be string type
        for (let rule of this._config['rules']) {
            if (typeof rule !== 'string') {
                callback(false, 'Not all rule is string type');
                return;
            }
        }
        callback(true, '');
    }
    precompileAsRegexList(callback) {
        if (!this._config) {
            callback(false, 'config is invalidate');
            return;
        }
        // all rule must be string type
        for (let rule of this._config['rules']) {
            if (typeof rule !== 'string') {
                callback(false, 'Not all rule is string type');
                return;
            }
        }
        // translate string type rule into RegEx
        let newRules = [];
        for (let rule of this._config['rules']) {
            try {
                let newRule = new RegExp(rule);
                newRules.push(newRule);
            }
            catch (e) {
                callback(false, 'rule regex incorrect : ' + rule);
                return;
            }
        }
        // override the rules in config
        this._config['rules'] = newRules;
        callback(true, '');
    }
    precompileAsGeneral(callback) {
        if (!this._config) {
            callback(false, 'config is invalidate');
            return;
        }
        // field: prefix <optional>
        if (this._config['prefix']) {
            try {
                this._config['_prefix_regex'] = new RegExp(this._config['prefix'] + '(.+)');
            }
            catch (e) {
                callback(false, 'prefix regex incorrect : ' + this._configPath);
                return;
            }
        }
        // for each object in rules
        for (let rule of this._config['rules']) {
            try {
                rule['_src_regex'] = new RegExp(rule['src']);
            }
            catch (e) {
                callback(false, 'src regex incorrect : ' + rule['src']);
                return;
            }
            if (rule['until']) {
                try {
                    rule['_until_regex'] = new RegExp(rule['until']);
                }
                catch (e) {
                    callback(false, 'until regex incorrect : ' + rule['until']);
                    return;
                }
            }
        }
        callback(true, '');
    }
}
exports.FilterConfigReader = FilterConfigReader;
//# sourceMappingURL=config.js.map