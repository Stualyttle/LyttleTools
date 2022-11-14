"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = void 0;
const runCommand_1 = require("../../runCommand");
const fs_1 = __importDefault(require("fs"));
const main_1 = require("../../../main");
const check = () => {
    const _myVersion = (0, runCommand_1.runCommand)('git diff HEAD --no-ext-diff --unified=0 --exit-code -a --no-prefix version.txt | grep "^+"');
    const _lastVersion = (0, runCommand_1.runCommand)('git diff HEAD --no-ext-diff --unified=0 --exit-code -a --no-prefix version.txt | grep "^-"');
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
    try {
        const currentVersion = fs_1.default.readFileSync(main_1.config.app.path + "version.txt", "utf8");
        fs_1.default.writeFileSync("./version.txt", currentVersion + "\n");
    }
    catch (e) {
        fs_1.default.writeFileSync("./version.txt", "0.0.0.0: ");
    }
    return (0, exports.check)();
};
exports.check = check;
//# sourceMappingURL=checkVersion.js.map