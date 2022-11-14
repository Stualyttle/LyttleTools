import { runCommand } from "../../runCommand";

export const pull = () => {
  runCommand("git pull");
};
