import * as fs from "fs";

export interface ConfigSettings {
  tools: {
    autoUpdate: boolean;
    debug: boolean;
  };
  node: {
    breakVersion: boolean;
    lockVersion: boolean;
    version: string;
  };
}

const getYamlSettings = ({ tools, node }) => {
  const valid = (value, type, standard) =>
    typeof value === type ? value : standard;

  return [
    "# Lyttle Tools Configuration",
    {
      tools: {
        autoUpdate: valid(tools.autoUpdate, "boolean", false),
        debug: valid(tools.debug, "boolean", false),
      },
    },
    "# Node Configuration",
    {
      node: {
        breakVersion: valid(node.breakVersion, "boolean", false),
        lockVersion: valid(node.lockVersion, "boolean", false),
        version: valid(node.version, "string", "v0.0.0"),
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
