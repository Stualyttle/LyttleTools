"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const getConfig_1 = require("./utils/config/getConfig");
const tasks_1 = require("./tasks");
const updater_1 = require("./utils/app/updater");
exports.config = (0, getConfig_1.getConfig)();
if (exports.config.app.debug)
    console.log("config:", exports.config);
(0, updater_1.update)();
(0, tasks_1.tasks)();
//# sourceMappingURL=main.js.map