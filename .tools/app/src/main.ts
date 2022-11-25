import { getConfig } from "./utils/config/getConfig";
import { tasks } from "./tasks";
import { update } from "./utils/app/updater";
import dns from "dns";
import { log } from "./utils/log";

export const config = getConfig();
if (config.app.debug) console.log("config:", config);

dns.lookupService("1.1.1.1", 53, (err) => {
  if (!!err) {
    log("error", "No internet connection! Cannot run tools without it.");
    log("info", "Starting app anyway...");
    return;
  }

  update();
  tasks();
});
