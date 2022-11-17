import { getNodeVersion } from "./getNodeVersion";

import { config } from "../../../../main";
import { log } from "../../../log";

export const lock = () => {
  if (config.app.isGitHook) return;
  // @ts-ignore
  if (!config.settings.node.lockVersion) return;

  // @ts-ignore
  const setVersion = config.settings.node.version;
  const version = getNodeVersion();

  if (version !== setVersion) {
    log(
      "error",
      "You are using a wrong nodejs version, You are currently using " +
        "\x1b[33m" +
        version +
        "\x1b[31m" +
        " but you should be using " +
        "\x1b[32m" +
        setVersion +
        "\x1b[31m" +
        ". Use NVM (Node Version Manager) to fix this!" +
        "\x1b[0m"
    );
    process.exit(1);
  }
};
