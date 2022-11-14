import { config } from "../../main";
import { runCommand } from "../runCommand";
import { log } from "../log";
import { setYamlConfig } from "../config/yaml/setYamlConfig";
import fs from "fs";

export const update = () => {
  // @ts-ignore
  if (!config.settings?.tools?.autoUpdate) return;

  const rawCloudVersion = runCommand(
    "curl -L https://raw.githubusercontent.com/Stualyttle/LyttleTools/main/.tools/app/version.ignore"
  );

  const cloudVersion = rawCloudVersion
    .toString()
    .split(".")
    .map((v) => parseInt(v));
  const appVersion = config.app.version;

  if (
    cloudVersion[0] > appVersion[0] ||
    cloudVersion[1] > appVersion[1] ||
    cloudVersion[2] > appVersion[2]
  ) {
    const versionBuilder = (n, i) => {
      if (n == 0 && ![0, 3, 6].includes(i)) return "";
      if (i === 6) return n;
      return n + ".";
    };
    log(
      "info",
      `Updating tools from ${appVersion.join(".")} to ${cloudVersion.join(
        "."
      )}, using script for the ${
        config.app.runningOnWindows ? "Windows" : "MacOS/Linux"
      } platform`
    );
    if (config.app.runningOnWindows)
      runCommand("curl -sSL https://install-git.lyttle.it/bat | cmd.exe > nul");
    else
      runCommand(
        "curl -sSL https://install-git.lyttle.it/sh | bash > /dev/null"
      );

    if (!config.app.isGitHook) {
      fs.cpSync(
        config.app.path + ".tools/app/assets/git-hooks",
        config.app.path + ".git/hooks",
        {
          recursive: true,
        }
      );

      if (!config.app.runningOnWindows)
        runCommand(`cd "${config.app.path}" && chmod ug+x ./.git/hooks/*`);
    }

    log("info", `Download successful. Bringing back your settings...`);

    setYamlConfig(config.settings, config.app.path);

    log("info", `Update successful, have fun developing!`);
  } else if (
    cloudVersion[0] < appVersion[0] ||
    cloudVersion[1] < appVersion[1] ||
    cloudVersion[2] < appVersion[2]
  ) {
    log(
      "warn",
      "You are using a experimental or newer version than the latest release! Please report any bugs you found!"
    );
  }
};
