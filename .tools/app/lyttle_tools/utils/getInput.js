"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInput = void 0;
const getInput = (question) => {
    return new Promise((resolve) => {
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        readline.question(question + " ", (name) => {
            readline.close();
            resolve(name);
        });
    });
};
exports.getInput = getInput;
//# sourceMappingURL=getInput.js.map