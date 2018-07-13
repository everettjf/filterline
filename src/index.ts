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

    let filePath = process.argv[2];
    let filter = new FilterLineByConfigFile();
    filter.filter(filePath);
}


main()
