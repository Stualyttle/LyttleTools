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
exports.setYamlConfig = void 0;
const fs = __importStar(require("fs"));
const getYamlSettings = ({ tools, node }) => {
    const valid = (value, type, standard) => typeof value === type ? value : standard;
    return [
        "# Lyttle Tools Configuration",
        {
            tools: {
                autoUpdate: valid(tools.autoUpdate, "boolean", false),
                debug: valid(tools.debug, "boolean", false),
            },
        },
        "# Node Configuration",
        {
            node: {
                breakVersion: valid(node.breakVersion, "boolean", false),
                lockVersion: valid(node.lockVersion, "boolean", false),
                version: valid(node.version, "string", "v0.0.0"),
            },
        },
    ];
};
const setYamlConfig = (config, path) => {
    const YAMLString = getYamlSettings(config)
        .map((setting) => {
        if (typeof setting === "string") {
            return setting;
        }
        const settingGroup = Object.keys(setting)[0];
        return `${settingGroup}:\n  ${Object.entries(setting[settingGroup])
            .map((s) => s.join(": "))
            .join("\n  ")}\n`;
    })
        .join("\n");
    fs.writeFileSync(`${path}.tools/config/config.yaml`, YAMLString, "utf8");
};
exports.setYamlConfig = setYamlConfig;
//# sourceMappingURL=setYamlConfig.js.map