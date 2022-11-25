"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const getConfig_1 = require("./utils/config/getConfig");
const tasks_1 = require("./tasks");
const updater_1 = require("./utils/app/updater");
const dns_1 = __importDefault(require("dns"));
const log_1 = require("./utils/log");
exports.config = (0, getConfig_1.getConfig)();
if (exports.config.app.debug)
    console.log("config:", exports.config);
dns_1.default.lookupService("1.1.1.1", 53, (err) => {
    if (!!err) {
        (0, log_1.log)("error", "No internet connection! Cannot run tools without it.");
        (0, log_1.log)("info", "Starting app anyway...");
        return;
    }
    (0, updater_1.update)();
    (0, tasks_1.tasks)();
});
//# sourceMappingURL=main.js.map