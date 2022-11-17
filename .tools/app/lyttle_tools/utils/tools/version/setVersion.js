"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = void 0;
const fs_1 = __importDefault(require("fs"));
const main_1 = require("../../../main");
const log_1 = require("../../log");
const updateVersion = (lastVersion, newVersion) => {
    fs_1.default.writeFileSync("./version.txt", newVersion);
    (0, log_1.log)("info", "Version.txt has been updated from " +
        "\x1b[31m" +
        lastVersion.join(".") +
        "\x1b[0m" +
        " to " +
        "\x1b[32m" +
        newVersion.split(":")[0] +
        "\x1b[0m" +
        "!");
};
const getVersionNumbers = () => {
    const today = new Date();
    const year = String(today.getFullYear()).slice(-2);
    const tempToday = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
    tempToday.setUTCDate(tempToday.getUTCDate() + 4 - (tempToday.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(tempToday.getUTCFullYear(), 0, 1));
    const week = String(Math.ceil(((tempToday - yearStart) / 86400000 + 1) / 7));
    const days = [7, 1, 2, 3, 4, 5, 6];
    const day = String(days[today.getDay()]);
    return { year: parseInt(year), week: parseInt(week), day: parseInt(day) };
};
const resetVersion = (lastVersion, { year, week, day }) => {
    const newVersion = `${year}.${week}.${day}.1: `;
    updateVersion(lastVersion, newVersion);
    (0, log_1.log)("error", "Your version was incorrect, copy it again from version.txt");
    process.exit(1);
};
const set = (versions = null) => {
    const { year, week, day } = getVersionNumbers();
    if (versions) {
        const lastVersion = versions[0];
        const myVersion = versions[1];
        const [lastMajor, lastMinor, lastPatch, lastRevision] = lastVersion;
        const [myMajor, myMinor, myPatch] = myVersion;
        const myRevision = lastMajor === myMajor && lastMinor === myMinor && lastPatch === myPatch
            ? lastRevision + 1
            : 1;
        const versionChanged = !(year === myMajor &&
            week === myMinor &&
            day === myPatch &&
            myVersion[3] === myRevision);
        if (year !== myMajor || week !== myMinor || day !== myPatch) {
            resetVersion(versions[0], { year, week, day });
        }
        const newVersion = `${myMajor}.${myMinor}.${myPatch}.${myRevision}: `;
        if (versionChanged)
            updateVersion(lastVersion, newVersion);
        const versionFile = main_1.config.app.gitMessage
            ? main_1.config.app.gitMessage.split(" ")[0] + " "
            : null;
        if (versionFile &&
            main_1.config.app.isGitHook &&
            lastMajor === myMajor &&
            lastMinor === myMinor &&
            lastPatch === myPatch &&
            lastVersion[3] + 1 !== myVersion[3]) {
            (0, log_1.log)("error", "Your version was incorrect, copy it again from version.txt");
            process.exit(1);
        }
        if (versionFile && newVersion !== versionFile) {
            (0, log_1.log)("error", "The version you entered in your commit message, does not match our version. Try again!");
            process.exit(1);
        }
        if (versionChanged)
            process.exit(1);
        return versionChanged;
    }
    resetVersion([0, 0, 0, 0], { year, week, day });
    return true;
};
exports.set = set;
//# sourceMappingURL=setVersion.js.map