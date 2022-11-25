"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.breaking = void 0;
const getBreaking_1 = require("./getBreaking");
const log_1 = require("../../../log");
const fs_1 = __importDefault(require("fs"));
const main_1 = require("../../../../main");
const runCommand_1 = require("../../../runCommand");
const ask_1 = require("../../../ask");
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
    const [install] = await (0, ask_1.ask)({ question: "Can we do that for you?" });
    let installed = false;
    if (!!install) {
        const [yarn] = await (0, ask_1.ask)({
            question: "NPM (n) or Yarn (y)? (CTRL + C to stop)",
        });
        (0, log_1.log)("info", "Removing node modules...");
        fs_1.default.rmSync(path + "node_modules", { recursive: true });
        (0, log_1.log)("info", "Installing node modules...");
        (0, runCommand_1.runCommand)(!!yarn ? "yarn" : "npm" + " install");
        (0, log_1.log)("info", "Reinstalling node modules complete!");
        fs_1.default.writeFileSync(path + "node_modules/lastBreakingChange.txt", latest);
        installed = true;
    }
    const [start] = await (0, ask_1.ask)({
        question: "Can we start the app?",
    });
    if (!start)
        process.exit(1);
    try {
        const currentBreakingChange = fs_1.default.readFileSync(path + "node_modules/lastBreakingChange.txt", "utf8");
        if (!installed && !!currentBreakingChange) {
            (0, log_1.log)("warn", "We could not verify if the node modules were deleted and reinstalled.");
            (0, log_1.log)("info", "We will accept this as reinstalled to not bother you further.");
            const [save] = await (0, ask_1.ask)({
                question: "Can we start the app and accept it (y) or just start the app, and let you know next time (n)?",
            });
            if (!!save)
                fs_1.default.writeFileSync(path + "node_modules/lastBreakingChange.txt", latest);
        }
    }
    catch (e) {
        fs_1.default.writeFileSync(path + "node_modules/lastBreakingChange.txt", latest);
    }
};
exports.breaking = breaking;
//# sourceMappingURL=enforceBreaking.js.map