import * as git from "./utils/tools/git";
import * as version from "./utils/tools/version";

import { config } from "./main";

export const tasks = () => {
  const {
    app: { isGitHook },
  } = config;

  // All actions only ran by the git hook
  if (isGitHook) {
    version.pull();
  }

  // All actions when not ran by the git git-hooks.
  if (!isGitHook) {
    git.updateHooks();
  }

  // All other actions.
  const checkRes = version.check();
  const changed = version.set(checkRes);
  if (changed) throw new Error("Version changed, try again!");
};
