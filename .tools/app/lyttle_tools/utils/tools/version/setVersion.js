"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = void 0;
const fs_1 = __importDefault(require("fs"));
const main_1 = require("../../../main");
const updateVersion = (lastVersion, newVersion) => {
    fs_1.default.writeFileSync("./version.txt", newVersion);
    console.log("Updated from", "\x1b[31m" + lastVersion.join("."), "\x1b[0m" + "to", "\x1b[32m" + newVersion.split(":")[0] + "\x1b[0m" + "!");
};
const set = ([lastVersion, myVersion]) => {
    const [lastMajor, lastMinor, lastPatch, lastRevision] = lastVersion;
    const [myMajor, myMinor, myPatch] = myVersion;
    const myRevision = lastMajor === myMajor && lastMinor === myMinor && lastPatch === myPatch
        ? lastRevision + 1
        : 1;
    const today = new Date();
    const year = String(today.getFullYear()).slice(-2);
    const tempToday = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
    tempToday.setUTCDate(tempToday.getUTCDate() + 4 - (tempToday.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(tempToday.getUTCFullYear(), 0, 1));
    const week = String(Math.ceil(((tempToday - yearStart) / 86400000 + 1) / 7));
    const days = [7, 1, 2, 3, 4, 5, 6];
    const day = String(days[today.getDay()]);
    if (parseInt(year) !== myMajor ||
        parseInt(week) !== myMinor ||
        parseInt(day) !== myPatch) {
        const newVersion = `${year}.${week}.${day}.1: `;
        updateVersion(lastVersion, newVersion);
        throw new Error("Invalid version, try again!");
    }
    const newVersion = `${myMajor}.${myMinor}.${myPatch}.${myRevision}: `;
    updateVersion(lastVersion, newVersion);
    if (main_1.config.isGitHook &&
        lastMajor === myMajor &&
        lastMinor === myMinor &&
        lastPatch === myPatch &&
        lastVersion[3] + 1 !== myVersion[3])
        throw new Error("Invalid version, try again!");
    return [myVersion, [myMajor, myMinor, myPatch, myRevision]];
};
exports.set = set;
//# sourceMappingURL=setVersion.js.map