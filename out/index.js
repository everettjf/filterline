#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_configfile_1 = require("./filter_configfile");
function usage() {
    console.log('Usage: filterline <filepath>');
}
function main() {
    let argv = process.argv;
    if (argv.length !== 3) {
        usage();
        return;
    }
    let filePath = process.argv[2];
    let filter = new filter_configfile_1.FilterLineByConfigFile();
    filter.filter(filePath);
}
main();
//# sourceMappingURL=index.js.map