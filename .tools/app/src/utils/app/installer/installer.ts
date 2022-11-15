import { runCommand } from "../../runCommand";
import { setYamlConfig } from "../../config/yaml/setYamlConfig";
import { welcome } from "./welcome.installer";
import { ask } from "./ask.installer";

export const installer = async (config) => {
  try {
    welcome();
    const appInPackage = await ask(
      "Can we install the installer script into your current package.json?",
      "You can still core it yourself if you want to do that later!"
    );

    const lockNode = await ask(
      "Want to lock the node version for this project?",
      null,
      "This needs the package.json to be core correctly!"
    );

    const autoUpdate = await ask("Do you want to auto install updates?");

    const appInPackageMsg = appInPackage
      ? "\x1b[32m" +
        "✔   We WILL copy parts from our tempate into your package.json" +
        "\x1b[0m"
      : "\x1b[31m" + "❌   We will NOT touch your package.json" + "\x1b[0m";
    const lockNodeMsg = lockNode
      ? "\x1b[32m" +
        "✔   We WILL enable node version locking, and set it to your version! (you can still change this)" +
        "\x1b[0m"
      : "\x1b[31m" + "❌   We will NOT enable node version locking" + "\x1b[0m";
    const autoUpdateMsg = autoUpdate
      ? "\x1b[32m" + "✔   We WILL enable auto updates" + "\x1b[0m"
      : "\x1b[31m" + "❌   We will NOT enable auto updates" + "\x1b[0m";

    const sureMsg = `${appInPackageMsg}\n${lockNodeMsg}\n${autoUpdateMsg}`;

    const correct = await ask(
      "❓   Are you sure we can do these handlings below?",
      null,
      null,
      sureMsg
    );

    if (!correct) {
      await ask(
        null,
        "Installer has been closed, nothing has been installed (only the .lyttle_tools folder has been downloaded)"
      );
      return process.exit(1);
    }

    // @ts-ignore
    config.settings.tools.autoUpdate = autoUpdate;
    // @ts-ignore
    config.settings.node.lockVersion = lockNode;
    if (lockNode) {
      // @ts-ignore
      config.settings.node.version = process.version;
    }
    setYamlConfig(config.settings, config.app.path);

    console.log("\x1b[32m" + "✔   Config created!" + "\x1b[0m");
    console.log("\x1b[32m" + "🔧   Completing instalation..." + "\x1b[0m");
    runCommand("node ./.tools/app/lyttle_tools/main.js");
    console.log(
      "\x1b[32m" +
        "✔   Lyttle Tools has successfully been installed!" +
        "\x1b[0m"
    );
  } catch (e) {
    // console.log("myERR", e);
    console.log(
      "\x1b[31m" +
        "❌   Something went horribly wrong, please contract the developer!" +
        "\x1b[0m"
    );
  }
};
