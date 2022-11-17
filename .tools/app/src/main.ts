import { getConfig } from "./utils/config/getConfig";
import { tasks } from "./tasks";
import { update } from "./utils/app/updater";

export const config = getConfig();
if (config.app.debug) console.log("config:", config);

update();
tasks();
