import * as fs from "fs";
import { config } from "../../../../main";

export const getBreaking = () => {
  const path = config.app.path;
  let latest = null;
  let mine = null;

  try {
    latest = fs.readFileSync(
      path + ".tools/config/lastBreakingChange.txt",
      "utf8"
    );
    mine = fs.readFileSync(
      path + "node_modules/lastBreakingChange.txt",
      "utf8"
    );
  } catch (e) {}

  return [latest, mine];
};
