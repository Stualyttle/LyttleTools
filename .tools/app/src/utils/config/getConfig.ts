import { getYamlConfig } from "./yaml/getYamlConfig";
import * as os from "os";

export const getConfig = () => {
  const isGitHook = !!process.env.GIT_HOOKS;

  const path = "./";
  // console.log(runCommand(`cd ${path} && ls -a`).toString());
  const config = getYamlConfig(path);

  const isWindows = os.platform() === "win32";

  return {
    isGitHook,
    path,
    isWindows,
    config,
  };
};
