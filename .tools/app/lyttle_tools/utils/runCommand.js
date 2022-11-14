"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCommand = void 0;
const { execSync } = require("child_process");
const runCommand = (command) => {
    try {
        return execSync(command, { stdio: "pipe" });
    }
    catch (_) {
        return null;
    }
};
exports.runCommand = runCommand;
//# sourceMappingURL=runCommand.js.map