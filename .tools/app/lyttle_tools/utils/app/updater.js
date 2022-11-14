"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const main_1 = require("../../main");
const runCommand_1 = require("../runCommand");
const log_1 = require("../log");
const setYamlConfig_1 = require("../config/yaml/setYamlConfig");
const fs_1 = __importDefault(require("fs"));
const update = () => {
    if (!main_1.config.settings?.tools?.autoUpdate)
        return;
    const rawCloudVersion = (0, runCommand_1.runCommand)("curl -L https://raw.githubusercontent.com/Stualyttle/LyttleTools/main/.tools/app/version.ignore");
    const cloudVersion = rawCloudVersion
        .toString()
        .split(".")
        .map((v) => parseInt(v));
    const appVersion = main_1.config.app.version;
    if (cloudVersion[0] > appVersion[0] ||
        cloudVersion[1] > appVersion[1] ||
        cloudVersion[2] > appVersion[2]) {
        const versionBuilder = (n, i) => {
            if (n == 0 && ![0, 3, 6].includes(i))
                return "";
            if (i === 6)
                return n;
            return n + ".";
        };
        (0, log_1.log)("info", `Updating tools from ${appVersion.join(".")} to ${cloudVersion.join(".")}, using script for the ${main_1.config.app.runningOnWindows ? "Windows" : "MacOS/Linux"} platform`);
        if (main_1.config.app.runningOnWindows)
            (0, runCommand_1.runCommand)("curl -sSL https://install-git.lyttle.it/bat | cmd.exe > nul");
        else
            (0, runCommand_1.runCommand)("curl -sSL https://install-git.lyttle.it/sh | bash > /dev/null");
        if (!main_1.config.app.isGitHook) {
            fs_1.default.cpSync(main_1.config.app.path + ".tools/app/assets/git-hooks", main_1.config.app.path + ".git/hooks", {
                recursive: true,
            });
            if (!main_1.config.app.runningOnWindows)
                (0, runCommand_1.runCommand)(`cd "${main_1.config.app.path}" && chmod ug+x ./.git/hooks/*`);
        }
        (0, log_1.log)("info", `Download successful. Bringing back your settings...`);
        (0, setYamlConfig_1.setYamlConfig)(main_1.config.settings, main_1.config.app.path);
        (0, log_1.log)("info", `Update successful, have fun developing!`);
    }
    else if (cloudVersion[0] < appVersion[0] ||
        cloudVersion[1] < appVersion[1] ||
        cloudVersion[2] < appVersion[2]) {
        (0, log_1.log)("warn", "You are using a experimental or newer version than the latest release! Please report any bugs you found!");
    }
};
exports.update = update;
//# sourceMappingURL=updater.js.map