import { runCommand } from "../../runCommand";
import { setYamlConfig } from "../../config/yaml/setYamlConfig";
import { welcome } from "./welcome.installer";
import { ask } from "./ask.installer";
import { Config } from "../../config/getConfig";

export const installer = async (config: Config) => {
  try {
    welcome();

    const settingQuestions: number = 3;

    // const appInPackage = await ask({
    //   amount: [1, settingQuestions],
    //   question:
    //     "Can we install the installer script into your current package.json?",
    //   info: "You can still core it yourself if you want to do that later!",
    //   yes: "We WILL copy parts from our template into your package.json",
    //   no: "We will NOT touch your package.json",
    // });

    const [lockNode, lockNodeMsg] = await ask({
      amount: [1, settingQuestions],
      question: "Want to lock the node version for this project?",
      warning: "This needs the package.json to be core correctly!",
      yes: "We WILL enable node version locking, and set it to your version!",
      no: "We will NOT enable node version locking.",
    });

    const [breakingNode, breakingNodeMsg] = await ask({
      amount: [2, settingQuestions],
      question: "Want to enable breaking changes?",
      info: "This will notify your team when their node_modules should be reinstalled?",
      yes: "We WILL enable breaking changes checks and run in in our tools!",
      no: "We will NOT enable breaking changes checks.",
    });

    const [autoUpdate, autoUpdateMsg] = await ask({
      amount: [3, settingQuestions],
      question: "Do you want to auto install updates?",
      yes: "We WILL enable auto updates!",
      no: "We will NOT enable auto updates.",
    });

    // const appInPackageMsg = appInPackage
    //   ? "\x1b[32m" + "✔   " + "\x1b[0m"
    //   : "\x1b[31m" + "❌   We will NOT touch your package.json" + "\x1b[0m";
    // const lockNodeMsg = lockNode
    //   ? "\x1b[32m" +
    //     "✔   We WILL enable node version locking, and set it to your version! (you can still change this)" +
    //     "\x1b[0m"
    //   : "\x1b[31m" + "❌   We will NOT enable node version locking" + "\x1b[0m";
    // const autoUpdateMsg = autoUpdate
    //   ? "\x1b[32m" + "✔   We WILL enable auto updates" + "\x1b[0m"
    //   : "\x1b[31m" + "❌   We will NOT enable auto updates" + "\x1b[0m";

    const sureMsg = `${lockNodeMsg}\n${breakingNodeMsg}\n${autoUpdateMsg}`;

    const correct = await ask({
      question: "❓   Is this correct?",
      extra: sureMsg,
    });

    if (!correct) {
      await ask({
        info: "Installer has been closed, nothing has been installed (only the .lyttle_tools folder has been downloaded)",
      });
      return process.exit(1);
    }

    // Set settings:
    config.settings.tools.autoUpdate = autoUpdate;
    config.settings.node.breakVersion = breakingNode;
    config.settings.node.lockVersion = lockNode;

    if (lockNode) {
      config.settings.node.version = process.version;
    }

    // Save settings
    setYamlConfig(config.settings, config.app.path);

    // Install tools
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
