import { installer } from "./utils/app/installer";
import { getConfig } from "./utils/config/getConfig";

const config = getConfig();
installer(config);
