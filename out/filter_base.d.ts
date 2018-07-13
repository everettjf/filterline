declare class FilterLineBase {
    protected _filePath?: string;
    protected showInfo(text: string): void;
    protected showError(text: string): void;
    protected filterFile(): void;
    protected matchLine(line: string): string | undefined;
    protected prepare(callback: (succeed: boolean) => void): void;
    filter(filePath: string): void;
}
export { FilterLineBase };
