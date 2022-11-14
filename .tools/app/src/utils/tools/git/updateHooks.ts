import fs from "fs";
import { config } from "../../../main";
import { runCommand } from "../../runCommand";

export const updateHooks = () => {
  const { path, isWindows } = config;
  fs.cpSync(path + ".tools/app/assets/git-hooks", path + ".git/hooks", {
    recursive: true,
  });

  if (!isWindows) runCommand(`cd "${path}" && chmod ug+x ./.git/hooks/*`);
};
