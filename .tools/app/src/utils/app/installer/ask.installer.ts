import { yesAndNo } from "../../text";
import { check } from "../../check";

export const ask = async (
  question: string | null = null,
  info: string | null = null,
  warn: string | null = null,
  extra: string | null = null
) => {
  if (question)
    console.log(
      "\x1b[35m" + "[1/3]",
      "\x1b[0m" + "\x1b[1m" + question,
      yesAndNo
    );
  if (info) console.log("\x1b[36m" + "Info: " + info + "\x1b[0m");
  if (warn) console.log("\x1b[33m" + "Warning: " + warn + "\x1b[0m");
  if (extra) console.log(extra);
  return question ? check() : false;
};
