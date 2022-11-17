"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ask = void 0;
const text_1 = require("../../text");
const check_1 = require("../../check");
const ask = async (options) => {
    const { amount = [0, 0], question = null, warning = null, extra = null, info = null, yes = null, no = null, } = options;
    if (question) {
        if (amount[0] === 0 && amount[1] === 0)
            console.log("\x1b[1m" + question, text_1.yesAndNo);
        else
            console.log("\x1b[35m" + `[${amount[0]}/${amount[1]}]`, "\x1b[0m" + "\x1b[1m" + question, text_1.yesAndNo);
    }
    if (info)
        console.log("\x1b[36m" + "Info: " + info + "\x1b[0m");
    if (warning)
        console.log("\x1b[33m" + "Warning: " + warning + "\x1b[0m");
    if (extra)
        console.log(extra);
    const result = question ? (await (0, check_1.check)()) : false;
    const msg = result
        ? "\x1b[32m" + `✔   ${yes}` + "\x1b[0m"
        : "\x1b[31m" + `❌   ${no}` + "\x1b[0m";
    return [result, msg];
};
exports.ask = ask;
//# sourceMappingURL=ask.installer.js.map