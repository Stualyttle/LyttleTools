"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function breakingError() {
    console.log('Breaking changes detected! Please delete "./node_modules" & "./dist", then run "npm i" and after that run "npm run tools:breaking:accept"');
    throw new Error('\n\nBreaking changes detected! \nPlease delete "./node_modules" & "./dist", \nthen run "npm i" \nand after that run "npm run tools:breaking:accept"\n\n');
}
function checkForBreakingChanges() {
    let lastBreakingChanges = null;
    let currentBreakingChanges = null;
    try {
        lastBreakingChanges = fs_1.default.readFileSync("./.lyttle_tools/config/breaking.config.json", "utf8");
        currentBreakingChanges = fs_1.default.readFileSync("./node_modules/breaking.config.json", "utf8");
    }
    catch (e) {
        breakingError();
    }
    if (lastBreakingChanges !== currentBreakingChanges ||
        (!lastBreakingChanges && !currentBreakingChanges))
        breakingError();
    else
        console.log("No breaking changes detected");
}
checkForBreakingChanges();
//# sourceMappingURL=check.js.map