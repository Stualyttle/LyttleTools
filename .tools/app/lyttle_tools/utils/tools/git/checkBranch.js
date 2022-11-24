"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBranch = void 0;
const main_1 = require("../../../main");
const runCommand_1 = require("../../runCommand");
const log_1 = require("../../log");
const ask_1 = require("../../ask");
const getInput_1 = require("../../getInput");
const checkBranch = async () => {
    if (!main_1.config.settings.git.onlyFeatureBranches)
        return;
    const branch = (0, runCommand_1.runCommand)("git branch --show-current");
    if (!branch)
        return;
    const branchName = branch.toString();
    const isFeature = branchName.startsWith("feature/");
    let removeThisBranch = false;
    let throwError = true;
    if (isFeature) {
        const [continueThis] = await (0, ask_1.ask)({
            question: `Are you still working on this feature? (${branchName.split("\n")[0]})`,
        });
        throwError = continueThis;
        if (continueThis)
            return;
        removeThisBranch = true;
    }
    if (throwError) {
        (0, log_1.log)("error", "You are not on a feature branch. Please create a feature branch before committing.");
    }
    const [res] = await (0, ask_1.ask)({
        question: "Can we create a new feature branch for you?",
    });
    if (res) {
        const name = await (0, getInput_1.getInput)("What feature are you working on:");
        const featureName = `feature/${name.toLowerCase().replaceAll(" ", "-")}`;
        (0, log_1.log)("info", `We will create the new feature branch: ${featureName}`);
        const res = (0, runCommand_1.runCommand)(`git checkout -b ${featureName}`);
        if (!res) {
            (0, log_1.log)("error", "Something went wrong creating the new branch.");
            (0, log_1.log)("info", "Be sure no files are modified or staged/committed needed to be pushed.");
            (0, log_1.log)("info", "Also be sure this branch isn't already in use.");
            process.exit(1);
        }
        if (isFeature && removeThisBranch)
            (0, runCommand_1.runCommand)(`git branch --delete ${branchName}`);
        const [start] = await (0, ask_1.ask)({ question: "Can we start the app?" });
        if (start)
            return;
        process.exit(1);
    }
    if (isFeature && removeThisBranch) {
        const switchedToMain = (0, runCommand_1.runCommand)(`git checkout main --force`);
        if (switchedToMain) {
            (0, runCommand_1.runCommand)(`git branch --delete ${branchName}`);
            (0, log_1.log)("info", `Removing "${branchName.split("\n")[0]}" and switching to main.`);
            const [start] = await (0, ask_1.ask)({ question: "Can we start the app?" });
            if (start)
                return;
        }
        else {
            (0, log_1.log)("error", "Something went wrong switching to main. Please do this manually.");
        }
        process.exit(1);
    }
    (0, log_1.log)("error", "Please create a feature branch before committing.");
    process.exit(1);
};
exports.checkBranch = checkBranch;
//# sourceMappingURL=checkBranch.js.map