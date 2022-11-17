import { ConfigSettings } from "./yaml/setYamlConfig";
export interface Config {
    app: {
        version: number[];
        debug: boolean;
        path: string;
        runningOnWindows: boolean;
        isGitHook: boolean;
        gitMessage: string;
    };
    settings: ConfigSettings;
}
export declare const getConfig: () => Config;
