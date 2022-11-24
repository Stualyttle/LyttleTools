export interface ConfigSettings {
    tools: {
        autoUpdate: boolean;
        debug: boolean;
    };
    node: {
        breakVersion: boolean;
        lockVersion: boolean;
        version: string;
    };
    git: {
        versioning: boolean;
        onlyFeatureBranches: boolean;
    };
}
export declare const setYamlConfig: (config: any, path: any) => void;
