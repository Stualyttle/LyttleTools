import { config } from "../../../main";
import { runCommand } from "../../runCommand";
import { log } from "../../log";
import { ask } from "../../ask";
import { getInput } from "../../getInput";

export const checkBranch = async () => {
  if (!config.settings.git.onlyFeatureBranches) return;

  const branch = runCommand("git branch --show-current");

  if (!branch) return;

  const branchName = branch.toString();
  const isFeature = branchName.startsWith("feature/");
  let removeThisBranch = false;
  let throwError = true;

  if (isFeature) {
    const [continueThis] = await ask({
      question: `Are you still working on this feature? (${
        branchName.split("\n")[0]
      })`,
    });
    throwError = continueThis;
    if (continueThis) return;
    removeThisBranch = true;
  }

  if (throwError) {
    log(
      "error",
      "You are not on a feature branch. Please create a feature branch before committing."
    );
  }
  const [res] = await ask({
    question: "Can we create a new feature branch for you?",
  });

  if (res) {
    const name = await getInput("What feature are you working on:");
    const featureName = `feature/${name.toLowerCase().replaceAll(" ", "-")}`;
    log("info", `We will create the new feature branch: ${featureName}`);
    const res = runCommand(`git checkout -b ${featureName}`);
    if (!res) {
      log("error", "Something went wrong creating the new branch.");
      log(
        "info",
        "Be sure no files are modified or staged/committed needed to be pushed."
      );
      log("info", "Also be sure this branch isn't already in use.");
      process.exit(1);
    }

    if (isFeature && removeThisBranch)
      runCommand(`git branch --delete ${branchName}`);
    const [start] = await ask({ question: "Can we start the app?" });

    if (start) return;
    process.exit(1);
  }

  if (isFeature && removeThisBranch) {
    const switchedToMain = runCommand(`git checkout main`);
    if (switchedToMain) {
      runCommand(`git branch --delete ${branchName}`);

      log(
        "info",
        `Removing "${branchName.split("\n")[0]}" and switching to main.`
      );
      const [start] = await ask({ question: "Can we start the app?" });

      if (start) return;
    } else {
      log(
        "error",
        "Something went wrong switching to main. Please do this manually."
      );
    }
    process.exit(1);
  }

  log("error", "Please create a feature branch before committing.");
  process.exit(1);
};
