"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.breaking = void 0;
const getBreaking_1 = require("./getBreaking");
const log_1 = require("../../../log");
const check_1 = require("../../../check");
const text_1 = require("../../../text");
const fs_1 = __importDefault(require("fs"));
const main_1 = require("../../../../main");
const runCommand_1 = require("../../../runCommand");
const breaking = async () => {
    if (!main_1.config.settings.node.breakVersion)
        return;
    if (main_1.config.app.isGitHook)
        return;
    const path = main_1.config.app.path;
    if (!fs_1.default.existsSync(path + "node_modules"))
        return;
    const [latest, ours] = (0, getBreaking_1.getBreaking)();
    if (!(!latest || !ours || latest !== ours))
        return;
    (0, log_1.log)("error", "Breaking changes detected!");
    (0, log_1.log)("info", "Your company's policies require you to reinstall your node modules.");
    (0, log_1.log)("info", "Can we do that for you? " + text_1.yesAndNo);
    const install = await (0, check_1.check)();
    let installed = false;
    if (!!install) {
        (0, log_1.log)("info", "NPM (n) or Yarn (y)? (CTRL + C to stop) " + text_1.yesAndNo);
        const yarn = await (0, check_1.check)();
        (0, log_1.log)("info", "Removing node modules...");
        fs_1.default.rmSync(path + "./node_modules", { recursive: true });
        (0, log_1.log)("info", "Installing node modules...");
        (0, runCommand_1.runCommand)(!!yarn ? "yarn" : "npm" + " install");
        (0, log_1.log)("info", "Reinstalling node modules complete!");
        fs_1.default.writeFileSync(path + "./node_modules/lastBreakingChange.txt", latest);
        installed = true;
    }
    (0, log_1.log)("info", "Can we start the app? " + text_1.yesAndNo);
    const start = await (0, check_1.check)();
    if (!start)
        process.exit(1);
    try {
        const currentBreakingChange = fs_1.default.readFileSync(path + "node_modules/lastBreakingChange.txt", "utf8");
        if (!installed && !!currentBreakingChange) {
            (0, log_1.log)("warn", "We could not verify if the node modules were deleted and reinstalled.");
            (0, log_1.log)("info", "We will accept this as reinstalled to not bother you further.");
            (0, log_1.log)("info", "Can we start the app and accept it (y) or just start the app, and let you know next time (n)? " +
                text_1.yesAndNo);
            const save = await (0, check_1.check)();
            if (!!save)
                fs_1.default.writeFileSync(path + "./node_modules/lastBreakingChange.txt", latest);
        }
    }
    catch (e) {
        fs_1.default.writeFileSync(path + "./node_modules/lastBreakingChange.txt", latest);
    }
};
exports.breaking = breaking;
//# sourceMappingURL=enforceBreaking.js.map