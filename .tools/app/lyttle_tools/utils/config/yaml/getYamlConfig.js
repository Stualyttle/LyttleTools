"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYamlConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const setYamlConfig_1 = require("./setYamlConfig");
const getYamlConfig = (path) => {
    const config = {};
    const rawConfig = fs_1.default.readFileSync(`${path}.tools/config/config.yaml`, "utf8");
    const rawConfigNoComments = rawConfig
        .replaceAll(/#.*/g, "")
        .replaceAll("\n\n", "\n")
        .replaceAll(" ", "")
        .split("\n\n");
    rawConfigNoComments.forEach((c) => {
        const option = c.split(":")[0].replaceAll("\n", "");
        const optionConfig = { [option]: {} };
        c.split(":")
            .slice(1)
            .join(":")
            .split("\n")
            .filter((line) => line !== "")
            .forEach((line) => {
            const [key, v] = line.split(":");
            optionConfig[option][key] =
                v === "true" ? true : v === "false" ? false : Number(v) || v;
        });
        config[option] = optionConfig[option];
    });
    (0, setYamlConfig_1.setYamlConfig)(config, path);
    return config;
};
exports.getYamlConfig = getYamlConfig;
//# sourceMappingURL=getYamlConfig.js.map