import fs from "fs";
import { config } from "../../../main";
import { Version, Versions } from "./checkVersion";
import { log } from "../../log";

const updateVersion = (lastVersion, newVersion) => {
  // Change version in saved file
  fs.writeFileSync("./version.txt", newVersion);

  // Notify user
  log(
    "info",
    "Version.txt has been updated from " +
      "\x1b[31m" +
      lastVersion.join(".") +
      "\x1b[0m" +
      " to " +
      "\x1b[32m" +
      newVersion.split(":")[0] +
      "\x1b[0m" +
      "!"
  );
};

export interface VersionOptions {
  year: number;
  week: number;
  day: number;
}

const getVersionNumbers = (): VersionOptions => {
  // Check version: Get day
  const today = new Date();

  // Get year
  const year = String(today.getFullYear()).slice(-2);

  // Create new date for week calculation.
  const tempToday: Date = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
  );
  // Make Sunday's day number 7
  tempToday.setUTCDate(
    tempToday.getUTCDate() + 4 - (tempToday.getUTCDay() || 7)
  );
  // Get first day of year
  const yearStart: Date = new Date(Date.UTC(tempToday.getUTCFullYear(), 0, 1));
  // @ts-ignore
  // Calculate full weeks to the nearest Sunday
  const week = String(Math.ceil(((tempToday - yearStart) / 86400000 + 1) / 7));
  // Return array of year and week number

  // Get day
  const days = [7, 1, 2, 3, 4, 5, 6];
  const day = String(days[today.getDay()]);

  return { year: parseInt(year), week: parseInt(week), day: parseInt(day) };
};

const resetVersion = (
  lastVersion: Version,
  { year, week, day }: VersionOptions
) => {
  const newVersion = `${year}.${week}.${day}.1: `;
  updateVersion(lastVersion, newVersion);
  log("error", "Your version was incorrect, copy it again from version.txt");
  process.exit(1);
};

export const set = (versions: Versions | null = null) => {
  const { year, week, day } = getVersionNumbers();

  if (versions) {
    const lastVersion = versions[0];
    const myVersion = versions[1];
    const [lastMajor, lastMinor, lastPatch, lastRevision] = lastVersion;
    const [myMajor, myMinor, myPatch] = myVersion;

    const myRevision =
      lastMajor === myMajor && lastMinor === myMinor && lastPatch === myPatch
        ? lastRevision + 1
        : 1;

    const versionChanged = !(
      year === myMajor &&
      week === myMinor &&
      day === myPatch &&
      myVersion[3] === myRevision
    );

    if (year !== myMajor || week !== myMinor || day !== myPatch) {
      // Setup version
      resetVersion(versions[0], { year, week, day });
    }

    // Update version
    const newVersion = `${myMajor}.${myMinor}.${myPatch}.${myRevision}: `;
    if (versionChanged) updateVersion(lastVersion, newVersion);

    const versionFile = config.app.gitMessage
      ? config.app.gitMessage.split(" ")[0] + " "
      : null;

    if (
      versionFile &&
      config.app.isGitHook &&
      lastMajor === myMajor &&
      lastMinor === myMinor &&
      lastPatch === myPatch &&
      lastVersion[3] + 1 !== myVersion[3]
    ) {
      log(
        "error",
        "Your version was incorrect, copy it again from version.txt"
      );
      process.exit(1);
    }

    if (versionFile && newVersion !== versionFile) {
      log(
        "error",
        "The version you entered in your commit message, does not match our version. Try again!"
      );
      process.exit(1);
    }

    if (versionChanged) process.exit(1);
    return versionChanged;
  }

  resetVersion([0, 0, 0, 0], { year, week, day });
  return true;
};
