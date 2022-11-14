"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const dir = "./node_modules";
if (!fs_1.default.existsSync(dir)) {
    fs_1.default.mkdirSync(dir);
}
const newVersion = fs_1.default.readFileSync("./.lyttle_tools/config/breaking.config.json", "utf8");
fs_1.default.writeFileSync("./node_modules/breaking.config.json", newVersion);
console.log("Breaking config updated");
//# sourceMappingURL=accept.js.map