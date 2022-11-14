"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pull = void 0;
const runCommand_1 = require("../../runCommand");
const pull = () => {
    (0, runCommand_1.runCommand)("git pull");
};
exports.pull = pull;
//# sourceMappingURL=pullVersion.js.map