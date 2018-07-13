declare class EOML {
    protected _value: any;
    protected _isArrayMode: boolean;
    protected _currentArrayItem?: any;
    protected _currentArrayKey: string;
    protected _lastKey: string;
    constructor();
    parse(filePath: string, callback: (succeed: boolean, errorinfo: string) => void): void;
    getValue(): any;
}
declare function eoml_split(str: string, sep: string): [string, string] | undefined;
export { EOML, eoml_split };
