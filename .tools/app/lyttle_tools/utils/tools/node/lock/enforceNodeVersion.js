"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lock = void 0;
const getNodeVersion_1 = require("./getNodeVersion");
const main_1 = require("../../../../main");
const log_1 = require("../../../log");
const lock = () => {
    if (main_1.config.app.isGitHook)
        return;
    if (!main_1.config.settings.node.lockVersion)
        return;
    const setVersion = main_1.config.settings.node.version;
    const version = (0, getNodeVersion_1.getNodeVersion)();
    if (version !== setVersion) {
        (0, log_1.log)("error", "You are using a wrong nodejs version, You are currently using " +
            "\x1b[33m" +
            version +
            "\x1b[31m" +
            " but you should be using " +
            "\x1b[32m" +
            setVersion +
            "\x1b[31m" +
            ". Use NVM (Node Version Manager) to fix this!" +
            "\x1b[0m");
        process.exit(1);
    }
};
exports.lock = lock;
//# sourceMappingURL=enforceNodeVersion.js.map