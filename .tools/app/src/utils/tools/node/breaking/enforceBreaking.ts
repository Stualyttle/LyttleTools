import { getBreaking } from "./getBreaking";
import { log } from "../../../log";
import { check } from "../../../check";
import { yesAndNo } from "../../../text";
import fs from "fs";
import { config } from "../../../../main";

export const breaking = async () => {
  const path = config.app.path;
  if (fs.existsSync(path + "node_modules")) {
    const [latest, ours] = getBreaking();

    if (!latest || !ours || latest !== ours) {
      log(
        "error",
        'Breaking changes detected! Please delete "./node_modules" & "./dist", then run "npm i" and after that run "npm run tools:breaking:accept"'
      );
      log("info", "Did you do that? " + yesAndNo);
      const res = await check();
      if (!res) process.exit(1);

      // fs.mkdirSync(path + "node_modules");
      fs.writeFileSync("./node_modules/lastBreakingChange.txt", latest);
    }
  }
};
