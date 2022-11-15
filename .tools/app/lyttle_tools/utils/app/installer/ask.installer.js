"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ask = void 0;
const text_1 = require("../../text");
const check_1 = require("../../check");
const ask = async (question = null, info = null, warn = null, extra = null) => {
    if (question)
        console.log("\x1b[35m" + "[1/3]", "\x1b[0m" + "\x1b[1m" + question, text_1.yesAndNo);
    if (info)
        console.log("\x1b[36m" + "Info: " + info + "\x1b[0m");
    if (warn)
        console.log("\x1b[33m" + "Warning: " + warn + "\x1b[0m");
    if (extra)
        console.log(extra);
    return question ? (0, check_1.check)() : false;
};
exports.ask = ask;
//# sourceMappingURL=ask.installer.js.map