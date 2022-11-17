import { yesAndNo } from "../../text";
import { check } from "../../check";

export interface AskOptions {
  amount?: [number, number];
  question?: string | null;
  info?: string | null;
  warning?: string | null;
  extra?: string | null;
  yes?: string | null;
  no?: string | null;
}

export const ask = async (options: AskOptions): Promise<[boolean, string]> => {
  const {
    amount = [0, 0],
    question = null,
    warning = null,
    extra = null,
    info = null,
    yes = null,
    no = null,
  } = options;

  if (question) {
    if (amount[0] === 0 && amount[1] === 0)
      console.log("\x1b[1m" + question, yesAndNo);
    else
      console.log(
        "\x1b[35m" + `[${amount[0]}/${amount[1]}]`,
        "\x1b[0m" + "\x1b[1m" + question,
        yesAndNo
      );
  }
  if (info) console.log("\x1b[36m" + "Info: " + info + "\x1b[0m");
  if (warning) console.log("\x1b[33m" + "Warning: " + warning + "\x1b[0m");
  if (extra) console.log(extra);

  const result: boolean = question ? ((await check()) as boolean) : false;
  const msg = result
    ? "\x1b[32m" + `✔   ${yes}` + "\x1b[0m"
    : "\x1b[31m" + `❌   ${no}` + "\x1b[0m";
  return [result, msg];
};
