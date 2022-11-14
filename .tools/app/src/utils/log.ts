type LogTypes = "info" | "warn" | "error" | "debug";

export const log = (type: LogTypes, message: string) => {
  const prefix = (title) => `[TOOLS:${title}]:`;
  switch (type) {
    case "warn":
      console.log("\x1b[33m" + prefix("WARNING"), message + "\x1b[0m");
      break;
    case "error":
      console.log("\x1b[31m" + prefix("ERROR"), message + "\x1b[0m");
      break;
    case "debug":
      console.log("\x1b[0m" + prefix("DEBUG"), message + "\x1b[0m");
      break;
    default:
      console.log("\x1b[0m" + prefix("INFO"), message + "\x1b[0m");
  }
};
