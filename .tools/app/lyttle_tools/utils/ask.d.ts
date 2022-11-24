export interface AskOptions {
    amount?: [number, number];
    question?: string | null;
    info?: string | null;
    warning?: string | null;
    extra?: string | null;
    yes?: string | null;
    no?: string | null;
}
export declare const ask: (options: AskOptions) => Promise<[boolean, string]>;
