"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ask = void 0;
const text_1 = require("./text");
const check_1 = require("./check");
const ask = async (options) => {
    const { amount = [0, 0], question = null, warning = null, extra = null, info = null, yes = null, no = null, } = options;
    let questionText = "";
    if (question) {
        if (amount[0] === 0 && amount[1] === 0)
            questionText = "\x1b[1m" + question + " " + text_1.yesAndNo;
        else
            questionText =
                "\x1b[35m" +
                    `[${amount[0]}/${amount[1]}]` +
                    " " +
                    "\x1b[0m" +
                    "\x1b[1m" +
                    question +
                    " " +
                    text_1.yesAndNo;
    }
    let infoText = "";
    if (info)
        infoText = "\x1b[36m" + "Info: " + info + "\x1b[0m";
    let warningText = "";
    if (warning)
        warningText = "\x1b[33m" + "Warning: " + warning + "\x1b[0m";
    let extraText = "";
    if (extra)
        extraText = extra;
    if (info || warning || extra)
        process.stdout.write(infoText + warningText + extraText + "\n");
    process.stdout.write(questionText + "\r");
    const result = question ? (await (0, check_1.check)()) : false;
    if (question) {
        const yesTXT = "\x1b[0m" + "(" + "\x1b[32m" + "yes" + "\x1b[0m" + ")";
        const noTXT = "\x1b[0m" + "(" + "\x1b[31m" + "no" + "\x1b[0m" + ")";
        const resultYorN = result ? yesTXT : noTXT;
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        if (amount[0] === 0 && amount[1] === 0)
            questionText = "\x1b[1m" + question + " " + resultYorN;
        else
            questionText =
                "\x1b[35m" +
                    `[${amount[0]}/${amount[1]}]` +
                    " " +
                    "\x1b[0m" +
                    "\x1b[1m" +
                    question +
                    " " +
                    resultYorN;
        process.stdout.write(questionText + "\n\n");
    }
    const msg = result
        ? "\x1b[32m" + `✔   ${yes}` + "\x1b[0m"
        : "\x1b[31m" + `❌   ${no}` + "\x1b[0m";
    return [result, msg];
};
exports.ask = ask;
//# sourceMappingURL=ask.js.map