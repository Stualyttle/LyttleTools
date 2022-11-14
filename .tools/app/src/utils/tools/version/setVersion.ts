import fs from "fs";
import { config } from "../../../main";

const updateVersion = (lastVersion, newVersion) => {
  // Change version in saved file
  fs.writeFileSync("./version.txt", newVersion);

  // Notify user
  console.log(
    "Updated from",
    "\x1b[31m" + lastVersion.join("."),
    "\x1b[0m" + "to",
    "\x1b[32m" + newVersion.split(":")[0] + "\x1b[0m" + "!"
  );
};

export const set = ([lastVersion, myVersion]) => {
  const [lastMajor, lastMinor, lastPatch, lastRevision] = lastVersion;
  const [myMajor, myMinor, myPatch] = myVersion;

  const myRevision =
    lastMajor === myMajor && lastMinor === myMinor && lastPatch === myPatch
      ? lastRevision + 1
      : 1;

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

  if (
    parseInt(year) !== myMajor ||
    parseInt(week) !== myMinor ||
    parseInt(day) !== myPatch
  ) {
    // Setup version
    const newVersion = `${year}.${week}.${day}.1: `;
    updateVersion(lastVersion, newVersion);
    throw new Error("Invalid version, try again!");
  }

  // Update version
  const newVersion = `${myMajor}.${myMinor}.${myPatch}.${myRevision}: `;
  updateVersion(lastVersion, newVersion);

  if (
    config.isGitHook &&
    lastMajor === myMajor &&
    lastMinor === myMinor &&
    lastPatch === myPatch &&
    lastVersion[3] + 1 !== myVersion[3]
  )
    throw new Error("Invalid version, try again!");
  return [myVersion, [myMajor, myMinor, myPatch, myRevision]];
};
