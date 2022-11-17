import { runCommand } from "../../runCommand";
import fs from "fs";
import { config } from "../../../main";

export type Version = [number, number, number, number];
export type Versions = [Version, Version];

export const check = (initial = true): Versions => {
  // const version = runCommand("ls -a");
  let _myVersion = runCommand(
    'git diff HEAD --no-ext-diff --unified=0 --exit-code -a --no-prefix version.txt | grep "^+"'
  );
  if (!_myVersion)
    _myVersion = runCommand(
      'git diff HEAD --no-ext-diff --unified=0 --exit-code -a --no-prefix version.txt | findstr /i "^+"'
    );
  let _lastVersion = runCommand(
    'git diff HEAD --no-ext-diff --unified=0 --exit-code -a --no-prefix version.txt | grep "^-"'
  );
  if (!_lastVersion)
    _lastVersion = runCommand(
      'git diff HEAD --no-ext-diff --unified=0 --exit-code -a --no-prefix version.txt | findstr /i "^-"'
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

  let currentVersion = "0.0.0.0: ";
  try {
    currentVersion = fs.readFileSync(config.app.path + "version.txt", "utf8");
    fs.writeFileSync(config.app.path + "./version.txt", currentVersion + "\n");
  } catch (e) {
    fs.writeFileSync(config.app.path + "./version.txt", "0.0.0.0: ");
  }

  if (!initial) {
    const c = currentVersion
      .split("\n")[0]
      .split(":")[0]
      .split(".")
      .map((v) => parseInt(v)) as Version;
    const myOldVersion: Version =
      c.length >= 4 ? [c[0], c[1], c[2], c[3]] : [0, 0, 0, 0];
    return [[0, 0, 0, 0], myOldVersion];
  }
  return check(false);
};
