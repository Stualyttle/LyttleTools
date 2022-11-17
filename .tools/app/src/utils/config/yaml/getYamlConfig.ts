import fs from "fs";
import { ConfigSettings, setYamlConfig } from "./setYamlConfig";

export const getYamlConfig = (path: string): ConfigSettings => {
  // Set initial _settings object
  const _settings = {};

  // Get the _settings file
  const rawConfig = fs.readFileSync(`${path}.tools/config/config.yaml`, "utf8");

  // Remove comments
  const rawConfigNoComments = rawConfig
    .replaceAll(/#.*/g, "")
    .replaceAll("\n\n", "\n")
    .replaceAll(" ", "")
    .split("\n\n");

  // Set the _settings
  rawConfigNoComments.forEach((c) => {
    // Get the option name
    const option = c.split(":")[0].replaceAll("\n", "");

    // Create the option object
    const _optionSetting = { [option]: {} };

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
        _optionSetting[option][key] =
          v === "true" ? true : v === "false" ? false : Number(v) || v;
      });

    // Set option in _settings.
    _settings[option] = _optionSetting[option];
  });

  const settings = { ..._settings } as ConfigSettings;

  setYamlConfig(settings, path);

  // Return the _settings
  return settings;
};
