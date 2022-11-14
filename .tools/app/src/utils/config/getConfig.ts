import { getYamlConfig } from "./yaml/getYamlConfig";
import * as os from "os";
import * as fs from "fs";

export const getConfig = () => {
  const isGitHook = !!process.env.GIT_HOOKS;

  const path = "./";
  // console.log(runCommand(`cd ${path} && ls -a`).toString());
  const settings = getYamlConfig(path);

  const runningOnWindows = os.platform() === "win32";

  const version = (
    fs.readFileSync(path + ".tools/app/version.ignore", "utf8")?.toString() ||
    "0.0.0"
  )
    .split(".")
    .map((v) => parseInt(v));

  const app = {
    isGitHook,
    runningOnWindows,
    path,
    version,
  };

  return {
    app,
    settings,
  };
};
