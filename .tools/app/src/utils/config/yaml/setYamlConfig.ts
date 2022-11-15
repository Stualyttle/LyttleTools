import * as fs from "fs";

const getYamlSettings = (c) => {
  return [
    "# Lyttle Tools Configuration",
    { tools: { autoUpdate: c.tools.autoUpdate ?? true } },
    "# Node Configuration",
    {
      node: {
        lockVersion: c.node.lockVersion ?? false,
        version: c.node.version ?? "v0.0.0",
      },
    },
  ];
};

export const setYamlConfig = (config, path) => {
  const YAMLString = getYamlSettings(config)
    .map((setting) => {
      if (typeof setting === "string") {
        return setting;
      }

      const settingGroup = Object.keys(setting)[0];

      return `${settingGroup}:\n  ${Object.entries(setting[settingGroup])
        .map((s) => s.join(": "))
        .join("\n  ")}\n`;
    })
    .join("\n");

  fs.writeFileSync(`${path}.tools/config/config.yaml`, YAMLString, "utf8");
};
