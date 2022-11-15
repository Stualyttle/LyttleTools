"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const installer_1 = require("./utils/app/installer");
const getConfig_1 = require("./utils/config/getConfig");
const config = (0, getConfig_1.getConfig)();
(0, installer_1.installer)(config);
//# sourceMappingURL=install.js.map