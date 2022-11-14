import * as git from "./utils/tools/git";
import * as version from "./utils/tools/version";

import { config } from "./main";

export const tasks = () => {
  const { isGitHook } = config;

  console.log(config);

  if (isGitHook) {
    version.pull();
    const checkRes = version.check();
    console.log(checkRes);
    if (checkRes) {
      const [my, set] = version.set(checkRes);
      if (my !== set) console.log("Aah!");
    }
  }

  // All actions when not ran by the git git-hooks.
  if (!isGitHook) {
    git.updateHooks();
  }

  // All other actions.
};
