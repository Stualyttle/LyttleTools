"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const getYamlConfig_1 = require("./yaml/getYamlConfig");
const os = __importStar(require("os"));
const fs = __importStar(require("fs"));
const getConfig = () => {
    const isGitHook = !!process.env.GIT_HOOKS;
    const gitMessage = process.env.GIT_MESSAGE ?? null;
    const path = "./";
    const settings = (0, getYamlConfig_1.getYamlConfig)(path);
    const runningOnWindows = os.platform() === "win32";
    const version = (fs.readFileSync(path + ".tools/app/version.ignore", "utf8")?.toString() ||
        "0.0.0")
        .split(".")
        .map((v) => parseInt(v));
    const debug = !!process.env.DEBUG || settings.tools.debug;
    const app = {
        version,
        debug,
        path,
        runningOnWindows,
        isGitHook,
        gitMessage,
    };
    return {
        app,
        settings,
    };
};
exports.getConfig = getConfig;
//# sourceMappingURL=getConfig.js.map