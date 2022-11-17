import * as git from "./utils/tools/git";
import * as version from "./utils/tools/version";
import * as node from "./utils/tools/node";

export const tasks = async () => {
  // Pull the latest commits.
  version.pull();

  // Update the git hooks.
  git.updateHooks();

  // Enforce the node version.
  node.lock();

  // Enforce the breaking changes.
  node.breaking();

  // Enforce the versioning.
  version.set(version.check());
};
