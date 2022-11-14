const { execSync } = require("child_process");

export const runCommand = (command) => {
  try {
    return execSync(command, { stdio: "pipe" });
  } catch (_) {
    return null;
  }
};
