import { getConfig } from "./utils/config/getConfig";
import { tasks } from "./tasks";

export const config = getConfig();

tasks();

// throw new Error("test");
