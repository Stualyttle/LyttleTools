"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const getConfig_1 = require("./utils/config/getConfig");
const tasks_1 = require("./tasks");
exports.config = (0, getConfig_1.getConfig)();
(0, tasks_1.tasks)();
//# sourceMappingURL=main.js.map