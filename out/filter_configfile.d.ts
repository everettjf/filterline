import { FilterLineBase } from './filter_base';
declare class FilterLineByConfigFile extends FilterLineBase {
    private _config?;
    private _configType;
    private _flag;
    private _untilRegex?;
    protected getConfigFilePath(filepath: string): string | undefined;
    protected prepare(callback: (succeed: boolean) => void): void;
    protected matchLine(line: string): string | undefined;
    protected matchLineStringList(line: string): string | undefined;
    protected matchLineStringListNotContainAny(line: string): string | undefined;
    protected matchLineRegexList(line: string): string | undefined;
    protected matchLineRegexListNotMatchAny(line: string): string | undefined;
    protected matchLineGeneral(line: string): string | undefined;
    dispose(): void;
}
export { FilterLineByConfigFile };
