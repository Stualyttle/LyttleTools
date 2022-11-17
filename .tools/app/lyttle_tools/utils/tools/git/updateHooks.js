"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHooks = void 0;
const fs_1 = __importDefault(require("fs"));
const main_1 = require("../../../main");
const runCommand_1 = require("../../runCommand");
const updateHooks = () => {
    if (main_1.config.app.isGitHook)
        return;
    const { app: { path, runningOnWindows }, } = main_1.config;
    fs_1.default.cpSync(path + ".tools/app/assets/git-hooks", path + ".git/hooks", {
        recursive: true,
    });
    if (!runningOnWindows)
        (0, runCommand_1.runCommand)(`cd "${path}" && chmod ug+x ./.git/hooks/*`);
};
exports.updateHooks = updateHooks;
//# sourceMappingURL=updateHooks.js.map