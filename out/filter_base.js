'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
class FilterLineBase {
    showInfo(text) {
        console.log('Info:' + text);
    }
    showError(text) {
        console.log('Error:' + text);
    }
    filterFile() {
        // read file
        const readline = require('readline');
        const fs = require('fs');
        var path = require('path');
        const rl = readline.createInterface({
            input: fs.createReadStream(this._filePath)
        });
        let outputPath = this._filePath + '.filterline' + path.extname(this._filePath);
        console.log('output : ' + outputPath);
        if (fs.existsSync(outputPath)) {
            console.log('output file already exist, force delete');
            fs.unlinkSync(outputPath);
        }
        // open write file
        let output = fs.createWriteStream(outputPath);
        output.on('open', () => {
            // filter line by line
            rl.on('line', (line) => {
                // console.log('line ', line);
                let fixedline = this.matchLine(line);
                if (fixedline !== undefined) {
                    output.write(fixedline + '\n');
                }
            }).on('close', () => {
                console.log('finish');
                this.showInfo('Complete :)');
            });
        });
    }
    matchLine(line) {
        return undefined;
    }
    prepare(callback) {
    }
    filter(filePath) {
        this._filePath = filePath;
        this.prepare((succeed) => {
            if (!succeed) {
                return;
            }
            this.filterFile();
        });
    }
}
exports.FilterLineBase = FilterLineBase;
//# sourceMappingURL=filter_base.js.map