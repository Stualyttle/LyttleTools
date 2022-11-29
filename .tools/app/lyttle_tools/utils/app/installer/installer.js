"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installer = void 0;
const runCommand_1 = require("../../runCommand");
const setYamlConfig_1 = require("../../config/yaml/setYamlConfig");
const welcome_installer_1 = require("./welcome.installer");
const ask_1 = require("../../ask");
const fs_1 = __importDefault(require("fs"));
const installer = async (config) => {
    try {
        (0, welcome_installer_1.welcome)();
        const settingQuestions = 3;
        const [lockNode, lockNodeMsg] = await (0, ask_1.ask)({
            amount: [1, settingQuestions],
            question: "Want to lock the node version for this project?",
            warning: "This needs the package.json to be core correctly!",
            yes: "We WILL enable node version locking, and set it to your version!",
            no: "We will NOT enable node version locking.",
        });
        const [breakingNode, breakingNodeMsg] = await (0, ask_1.ask)({
            amount: [2, settingQuestions],
            question: "Want to enable breaking changes?",
            info: "This will notify your team when their node_modules should be reinstalled?",
            yes: "We WILL enable breaking changes checks and run in in our tools!",
            no: "We will NOT enable breaking changes checks.",
        });
        const [autoUpdate, autoUpdateMsg] = await (0, ask_1.ask)({
            amount: [3, settingQuestions],
            question: "Do you want to auto install updates?",
            yes: "We WILL enable auto updates!",
            no: "We will NOT enable auto updates.",
        });
        const sureMsg = `${lockNodeMsg}\n${breakingNodeMsg}\n${autoUpdateMsg}`;
        const [correct] = await (0, ask_1.ask)({
            question: "❓   Is this correct?",
            extra: sureMsg,
        });
        if (!correct) {
            await (0, ask_1.ask)({
                info: "Installer has been closed, nothing has been installed (only the .lyttle_tools folder has been downloaded)",
            });
            return process.exit(1);
        }
        config.settings.tools.autoUpdate = autoUpdate;
        config.settings.node.breakVersion = breakingNode;
        config.settings.node.lockVersion = lockNode;
        if (lockNode) {
            config.settings.node.version = process.version;
        }
        (0, setYamlConfig_1.setYamlConfig)(config.settings, config.app.path);
        console.log("\x1b[32m" + "✔   Config created!" + "\x1b[0m");
        console.log("\x1b[32m" +
            '🔧   Backup up package.json to "./tools/config/package.backup.json"' +
            "\x1b[0m");
        fs_1.default.copyFileSync("./package.json", "./tools/config/package.backup.json");
        console.log("\x1b[32m" + "✔   Backup created!" + "\x1b[0m");
        console.log("\x1b[32m" + "🔧   Changing start command" + "\x1b[0m");
        const packageRaw = fs_1.default.readFileSync("./package.json", "utf8");
        const packageJson = JSON.parse(packageRaw);
        if (!packageJson.scripts.start.includes("npm -s run tools")) {
            packageJson.scripts.start = `npm -s run tools && ${packageJson.scripts.start}`;
            packageJson.scripts.tools = 'node ./.tools/app/lyttle_tools/main.js"';
            fs_1.default.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));
        }
        console.log("\x1b[32m" + "🔧   Completing instalation..." + "\x1b[0m");
        (0, runCommand_1.runCommand)("node ./.tools/app/lyttle_tools/main.js");
        console.log("\x1b[32m" +
            "✔   Lyttle Tools has successfully been installed!" +
            "\x1b[0m");
    }
    catch (e) {
        console.log("\x1b[31m" +
            "❌   Something went horribly wrong, please contract the developer!" +
            "\x1b[0m");
    }
};
exports.installer = installer;
//# sourceMappingURL=installer.js.map