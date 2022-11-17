import { runCommand } from "../../runCommand";
import { config } from "../../../main";

export const pull = () => {
  if (!config.app.isGitHook) return;
  runCommand("git pull");
};
