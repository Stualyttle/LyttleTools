import { getBreaking } from "./getBreaking";
import { log } from "../../../log";
import { check } from "../../../check";
import { yesAndNo } from "../../../text";
import fs from "fs";
import { config } from "../../../../main";
import { runCommand } from "../../../runCommand";

export const breaking = async () => {
  if (!config.settings.node.breakVersion) return;

  // If git hook stop here.
  if (config.app.isGitHook) return;

  // Check is node modules exists.
  const path = config.app.path;
  if (!fs.existsSync(path + "node_modules")) return;

  // Get the breaking changes.
  const [latest, ours] = getBreaking();

  // If the breaking changes are the same, stop here.
  if (!(!latest || !ours || latest !== ours)) return;

  // Send the messages about breaking:
  log("error", "Breaking changes detected!");
  log(
    "info",
    "Your company's policies require you to reinstall your node modules."
  );

  // Ask if we can do that
  log("info", "Can we do that for you? " + yesAndNo);
  const install = await check();
  let installed = false;

  // If we can do that, do it.
  if (!!install) {
    // Ask what package manager to use.
    log("info", "NPM (n) or Yarn (y)? (CTRL + C to stop) " + yesAndNo);
    const yarn = await check();

    // Remove the node modules.
    log("info", "Removing node modules...");
    fs.rmSync(path + "./node_modules", { recursive: true });

    // Install the node modules.
    log("info", "Installing node modules...");
    runCommand(!!yarn ? "yarn" : "npm" + " install");

    // Done.
    log("info", "Reinstalling node modules complete!");

    // Copy the breaking changes (for the check later).
    fs.writeFileSync(path + "./node_modules/lastBreakingChange.txt", latest);

    // set installed state.
    installed = true;
  }

  // Ask if we can start the app?
  log("info", "Can we start the app? " + yesAndNo);
  const start = await check();

  // If not, exit.
  if (!start) process.exit(1);

  // if this failed, they changed something in node modules so just update it.
  try {
    // get the current breaking changes.
    const currentBreakingChange = fs.readFileSync(
      path + "node_modules/lastBreakingChange.txt",
      "utf8"
    );

    // if no installer was ran and breaking changes was found, notify the dev.
    if (!installed && !!currentBreakingChange) {
      // Notify the dev.
      log(
        "warn",
        "We could not verify if the node modules were deleted and reinstalled."
      );
      log(
        "info",
        "We will accept this as reinstalled to not bother you further."
      );

      // Ask if we can accept it.
      log(
        "info",
        "Can we start the app and accept it (y) or just start the app, and let you know next time (n)? " +
          yesAndNo
      );
      const save = await check();

      // If the app can be started the dev wanted to do that.
      // So to not discourage the dev, we will not ask again.
      // And update the breaking change anyway. (not recommended)
      if (!!save)
        fs.writeFileSync(
          path + "./node_modules/lastBreakingChange.txt",
          latest
        );
    }
  } catch (e) {
    // Just update the breaking changes.
    fs.writeFileSync(path + "./node_modules/lastBreakingChange.txt", latest);
  }
};
