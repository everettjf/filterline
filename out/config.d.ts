declare class FilterConfigReader {
    private _config?;
    private _configPath;
    private _configType;
    getConfig(): any | undefined;
    getConfigType(): string;
    read(configPath: string, callback: (succeed: boolean, errorinfo: string) => void): void;
    precompileConfig(callback: (succeed: boolean, errorinfo: string) => void): void;
    private precompileAsStringList;
    private precompileAsRegexList;
    private precompileAsGeneral;
}
export { FilterConfigReader };
