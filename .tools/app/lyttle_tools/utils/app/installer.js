"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installer = void 0;
const main_1 = require("../../main");
const text_1 = require("../text");
const check_1 = require("../check");
const runCommand_1 = require("../runCommand");
const setYamlConfig_1 = require("../config/yaml/setYamlConfig");
const installer = async () => {
    try {
        console.log(`\nWelcome to Lyttle Tools!\n\n` +
            `This is a tool to help you manage your projects.\n` +
            `Lets go thru the installation config together!\n`);
        console.log("\x1b[35m" + "[1/3]", "\x1b[0m" +
            "\x1b[1m" +
            "Can we install the installer script into your current package.json?", text_1.yesAndNo);
        console.log("\x1b[36m" +
            "Info: You can still core it yourself if you want to do that later!" +
            "\x1b[0m");
        const appInPackage = await (0, check_1.check)();
        console.log("\x1b[35m" + "[2/3]", "\x1b[0m" + "\x1b[1m" + "Want to lock the node version for this project?", text_1.yesAndNo);
        console.log("\x1b[33m" +
            "Warning: This needs the package.json to be core correctly!" +
            "\x1b[0m");
        const lockNode = await (0, check_1.check)();
        console.log("\x1b[35m" + "[3/3]", "\x1b[0m" + "\x1b[1m" + "Do you want to auto install updates?", text_1.yesAndNo);
        const autoUpdate = await (0, check_1.check)();
        console.log("\x1b[1m" + "\n❓   Are you sure we can do these handlings below?", text_1.yesAndNo);
        const appInPackageMsg = appInPackage
            ? "\x1b[32m" +
                "✔   We WILL copy parts from our tempate into your package.json" +
                "\x1b[0m"
            : "\x1b[31m" + "❌   We will NOT touch your package.json" + "\x1b[0m";
        const lockNodeMsg = lockNode
            ? "\x1b[32m" +
                "✔   We WILL enable node version locking, and set it to your version! (you can still change this)" +
                "\x1b[0m"
            : "\x1b[31m" + "❌   We will NOT enable node version locking" + "\x1b[0m";
        const autoUpdateMsg = autoUpdate
            ? "\x1b[32m" + "✔   We WILL enable auto updates" + "\x1b[0m"
            : "\x1b[31m" + "❌   We will NOT enable auto updates" + "\x1b[0m";
        console.log(appInPackageMsg);
        console.log(lockNodeMsg);
        console.log(autoUpdateMsg);
        const correct = await (0, check_1.check)();
        if (!correct) {
            console.log("\x1b[36m" +
                "Info: Installer has been closed, nothing has been installed (only the .lyttle_tools folder has been downloaded)" +
                "\x1b[0m");
            return process.exit(1);
        }
        const nodeVersion = lockNode
            ? (0, runCommand_1.runCommand)("node -v").toString().trim()
            : null;
        main_1.config.settings.app.autoUpdate = autoUpdate;
        main_1.config.settings.node.lockNode = lockNode;
        if (lockNode) {
            main_1.config.settings.node.version = process.version;
        }
        (0, setYamlConfig_1.setYamlConfig)(main_1.config.settings, main_1.config.app.path);
        console.log("\x1b[32m" + "✔   Config created!\n" + "\x1b[0m");
        console.log("Installing Lyttle Tools:");
        console.log("\x1b[35m" + "[1/2]", "\x1b[0m" + "Version installing...");
        (0, runCommand_1.runCommand)("npm run --silent install:version");
        (0, runCommand_1.runCommand)("npm run --silent tools:version:update");
        console.log("\x1b[35m" + "[2/2]", "\x1b[0m" + "Breaking installing...");
        (0, runCommand_1.runCommand)("npm run --silent install:breaking");
        console.log("\x1b[32m" +
            "✔   Lyttle Tools has successfully been installed!" +
            "\x1b[0m");
    }
    catch (e) {
        console.log("myERR", e);
        console.log("\x1b[31m" +
            "❌   Something went horribly wrong, please contract the developer!" +
            "\x1b[0m");
    }
};
exports.installer = installer;
//# sourceMappingURL=installer.js.map