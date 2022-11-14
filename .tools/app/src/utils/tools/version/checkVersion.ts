import { runCommand } from "../../runCommand";
import fs from "fs";
import { config } from "../../../main";

type version = [number, number, number, number];

export const check = (): [version, version] | null => {
  // const version = runCommand("ls -a");
  const _myVersion = runCommand(
    'git diff HEAD --no-ext-diff --unified=0 --exit-code -a --no-prefix version.txt | grep "^+"'
  );
  const _lastVersion = runCommand(
    'git diff HEAD --no-ext-diff --unified=0 --exit-code -a --no-prefix version.txt | grep "^-"'
  );
  if (_myVersion && _lastVersion) {
    const latestVersion = _lastVersion
      .toString()
      .split("\n")[1]
      .replaceAll("-", "");
    const myVersion = _myVersion.toString().split("\n")[1].replaceAll("+", "");

    const latest = latestVersion.split(".").map((v) => parseInt(v));
    const mine = myVersion.split(".").map((v) => parseInt(v));

    return [latest, mine];
  }

  const currentVersion = fs.readFileSync(config.path + "version.txt", "utf8");
  fs.writeFileSync("./version.txt", currentVersion + "\n");
  return check();
};
