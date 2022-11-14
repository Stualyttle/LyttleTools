"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = void 0;
const check = async () => {
    return new Promise((resolve) => {
        function keyListener(key) {
            const byteArray = [...key];
            if (byteArray.length > 0 && byteArray[0] === 3) {
                console.log("\x1b[31m" +
                    '❌   We detected keypress "CTRL+C". Exiting process...' +
                    "\x1b[0m");
                process.exit(1);
            }
            const pressed = key.toString().toLowerCase();
            if (["y", "n"].includes(pressed)) {
                if (process.stdin.isTTY)
                    process.stdin.setRawMode(false);
                process.stdin.off("data", keyListener);
                process.stdin.pause();
                resolve(pressed === "y");
            }
        }
        process.stdin.resume();
        if (process.stdin.isTTY)
            process.stdin.setRawMode(true);
        process.stdin.on("data", keyListener);
    });
};
exports.check = check;
//# sourceMappingURL=check.js.map