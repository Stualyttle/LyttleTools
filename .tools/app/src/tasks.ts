import * as git from "./utils/tools/git";
import * as version from "./utils/tools/version";
import * as node from "./utils/tools/node";

export const tasks = async () => {
  // Pull the latest commits.
  await version.pull();

  // Update the git hooks.
  await git.updateHooks();
  await git.checkBranch();

  // Enforce the node version.
  await node.lock();

  // Enforce the breaking changes.
  await node.breaking();

  // Enforce the versioning.
  version.set(version.check());
};
