import { getYamlConfig } from "./yaml/getYamlConfig";
import * as os from "os";
import * as fs from "fs";
import { ConfigSettings } from "./yaml/setYamlConfig";

export interface Config {
  app: {
    version: number[];
    debug: boolean;
    path: string;
    runningOnWindows: boolean;
    isGitHook: boolean;
    gitMessage: string;
  };
  settings: ConfigSettings;
}

export const getConfig = (): Config => {
  const isGitHook = !!process.env.GIT_HOOKS;
  const gitMessage: string | null = process.env.GIT_MESSAGE ?? null;

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

  const debug = !!process.env.DEBUG || settings.tools.debug;

  const app = {
    version,
    debug,
    path,
    runningOnWindows,
    isGitHook,
    gitMessage,
  };

  return {
    app,
    settings,
  };
};
