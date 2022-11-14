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
const breaking = async () => {
    const path = main_1.config.app.path;
    const [latest, ours] = (0, getBreaking_1.getBreaking)();
    if (!latest || !ours || latest !== ours) {
        (0, log_1.log)("error", 'Breaking changes detected! Please delete "./node_modules" & "./dist", then run "npm i" and after that run "npm run tools:breaking:accept"');
        (0, log_1.log)("info", "Did you do that? " + text_1.yesAndNo);
        const res = await (0, check_1.check)();
        if (!res)
            process.exit(1);
        if (fs_1.default.existsSync(path + "node_modules")) {
            fs_1.default.writeFileSync("./node_modules/lastBreakingChange.txt", latest);
        }
    }
};
exports.breaking = breaking;
//# sourceMappingURL=enforceBreaking.js.map