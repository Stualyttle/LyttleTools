import fs from "fs";
import { config } from "../../../main";
import { runCommand } from "../../runCommand";

export const updateHooks = () => {
  if (config.app.isGitHook) return;

  const {
    app: { path, runningOnWindows },
  } = config;

  fs.cpSync(path + ".tools/app/assets/git-hooks", path + ".git/hooks", {
    recursive: true,
  });

  if (!runningOnWindows)
    runCommand(`cd "${path}" && chmod ug+x ./.git/hooks/*`);
};
