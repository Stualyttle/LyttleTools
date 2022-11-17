"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = void 0;
const runCommand_1 = require("../../runCommand");
const fs_1 = __importDefault(require("fs"));
const main_1 = require("../../../main");
const check = (initial = true) => {
    let _myVersion = (0, runCommand_1.runCommand)('git diff HEAD --no-ext-diff --unified=0 --exit-code -a --no-prefix version.txt | grep "^+"');
    if (!_myVersion)
        _myVersion = (0, runCommand_1.runCommand)('git diff HEAD --no-ext-diff --unified=0 --exit-code -a --no-prefix version.txt | findstr /i "^+"');
    let _lastVersion = (0, runCommand_1.runCommand)('git diff HEAD --no-ext-diff --unified=0 --exit-code -a --no-prefix version.txt | grep "^-"');
    if (!_lastVersion)
        _lastVersion = (0, runCommand_1.runCommand)('git diff HEAD --no-ext-diff --unified=0 --exit-code -a --no-prefix version.txt | findstr /i "^-"');
    if (_myVersion && _lastVersion) {
        const latestVersion = _lastVersion
            .toString()
            .split("\n")[1]
            .replaceAll("-", "");
        const myVersion = _myVersion.toString().split("\n")[1].replaceAll("+", "");
        const latest = latestVersion.split(".").map((v) => parseInt(v));
        const mine = myVersion.split(".").map((v) => parseInt(v));
        return [latest, mine];
    }
    let currentVersion = "0.0.0.0: ";
    try {
        currentVersion = fs_1.default.readFileSync(main_1.config.app.path + "version.txt", "utf8");
        fs_1.default.writeFileSync(main_1.config.app.path + "./version.txt", currentVersion + "\n");
    }
    catch (e) {
        fs_1.default.writeFileSync(main_1.config.app.path + "./version.txt", "0.0.0.0: ");
    }
    if (!initial) {
        const c = currentVersion
            .split("\n")[0]
            .split(":")[0]
            .split(".")
            .map((v) => parseInt(v));
        const myOldVersion = c.length >= 4 ? [c[0], c[1], c[2], c[3]] : [0, 0, 0, 0];
        return [[0, 0, 0, 0], myOldVersion];
    }
    return (0, exports.check)(false);
};
exports.check = check;
//# sourceMappingURL=checkVersion.js.map