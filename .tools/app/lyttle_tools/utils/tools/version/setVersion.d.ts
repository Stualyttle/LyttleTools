import { Versions } from "./checkVersion";
export interface VersionOptions {
    year: number;
    week: number;
    day: number;
}
export declare const set: (versions?: Versions | null) => boolean;
