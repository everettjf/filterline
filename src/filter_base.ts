'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

class FilterLineBase{
    protected _filePath?:string;

    protected showInfo(text: string){
        console.log('Info:' + text);
    }
    protected showError(text: string){
        console.log('Error:' + text);
    }

    protected filterFile(){
        // read file
        const readline = require('readline');
        const fs = require('fs');
        var path = require('path');

        const rl = readline.createInterface({
            input: fs.createReadStream(this._filePath)
        });

        let outputPath = this._filePath + '.filterline' + path.extname(this._filePath);
        console.log('output : ' + outputPath);
        if(fs.existsSync(outputPath)){
            console.log('output file already exist, force delete');
            fs.unlinkSync(outputPath);
        }

        // open write file
        let output = fs.createWriteStream(outputPath);
        output.on('open', ()=>{
            // filter line by line
            rl.on('line', (line: string)=>{
                
                // console.log('line ', line);
                let fixedline = this.matchLine(line);
                if(fixedline !== undefined){
                    output.write(fixedline + '\n');
                }

            }).on('close',()=>{
                console.log('finish');
                this.showInfo('complete');

            });
        });
    }

    protected matchLine(line: string): string | undefined{
        return undefined;
    }

    protected prepare(callback : (succeed: boolean)=>void){
    }
    public filter(filePath:string){
        this._filePath = filePath;

        this.prepare((succeed)=>{
            if(!succeed){
                return;
            }

            this.filterFile();
        });
    }
}

export { FilterLineBase};
