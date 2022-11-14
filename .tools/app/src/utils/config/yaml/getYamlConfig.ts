import fs from "fs";
import { setYamlConfig } from "./setYamlConfig";

export const getYamlConfig = (path) => {
  // Set initial config object
  const config = {};

  // Get the config file
  const rawConfig = fs.readFileSync(`${path}.tools/config/config.yaml`, "utf8");

  // Remove comments
  const rawConfigNoComments = rawConfig
    .replaceAll(/#.*/g, "")
    .replaceAll("\n\n", "\n")
    .replaceAll(" ", "")
    .split("\n\n");

  // Set the config
  rawConfigNoComments.forEach((c) => {
    // Get the option name
    const option = c.split(":")[0].replaceAll("\n", "");

    // Create the option object
    const optionConfig = { [option]: {} };

    // Get the option values
    c.split(":")
      .slice(1)
      .join(":")
      .split("\n")
      .filter((line) => line !== "")
      .forEach((line) => {
        // Get the key and value
        const [key, v] = line.split(":");
        // Set the key and value (in right type)
        optionConfig[option][key] =
          v === "true" ? true : v === "false" ? false : Number(v) || v;
      });

    // Set option in config.
    config[option] = optionConfig[option];
  });

  setYamlConfig(config, path);

  // Return the config
  return config;
};
