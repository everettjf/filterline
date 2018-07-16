#!/usr/bin/env node
import {FilterLineByConfigFile} from './filter_configfile';

function usage(){
    console.log('Usage: filterline <filepath>');
}


function main(){
    let argv = process.argv;
    if(argv.length !== 3){
        usage();
        return;
    }
    var path = require('path');
    const fs = require('fs');

    let filePath = process.argv[2];
    if(!fs.existsSync(filePath)){
        console.log('file not exist : ' + filePath);
        return;
    }

    if(!filePath.startsWith('/')){
        filePath = path.join(process.cwd(),filePath);
    }
    console.log('file : ' + filePath);

    let filter = new FilterLineByConfigFile();
    filter.filter(filePath);
}


main()
