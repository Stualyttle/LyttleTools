import { yesAndNo } from "./text";
import { check } from "./check";

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

  let questionText = "";
  if (question) {
    if (amount[0] === 0 && amount[1] === 0)
      questionText = "\x1b[1m" + question + " " + yesAndNo;
    else
      questionText =
        "\x1b[35m" +
        `[${amount[0]}/${amount[1]}]` +
        " " +
        "\x1b[0m" +
        "\x1b[1m" +
        question +
        " " +
        yesAndNo;
  }
  let infoText = "";
  if (info) infoText = "\x1b[36m" + "Info: " + info + "\x1b[0m";
  let warningText = "";
  if (warning) warningText = "\x1b[33m" + "Warning: " + warning + "\x1b[0m";
  let extraText = "";
  if (extra) extraText = extra;

  if (info || warning || extra)
    process.stdout.write(infoText + warningText + extraText + "\n");
  process.stdout.write(questionText + "\r");

  const result: boolean = question ? ((await check()) as boolean) : false;

  if (question) {
    const yesTXT = "\x1b[0m" + "(" + "\x1b[32m" + "yes" + "\x1b[0m" + ")";
    const noTXT = "\x1b[0m" + "(" + "\x1b[31m" + "no" + "\x1b[0m" + ")";
    const resultYorN = result ? yesTXT : noTXT;

    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);

    if (amount[0] === 0 && amount[1] === 0)
      questionText = "\x1b[1m" + question + " " + resultYorN;
    else
      questionText =
        "\x1b[35m" +
        `[${amount[0]}/${amount[1]}]` +
        " " +
        "\x1b[0m" +
        "\x1b[1m" +
        question +
        " " +
        resultYorN;

    process.stdout.write(questionText + "\n\n");
  }

  const msg = result
    ? "\x1b[32m" + `✔   ${yes}` + "\x1b[0m"
    : "\x1b[31m" + `❌   ${no}` + "\x1b[0m";
  return [result, msg];
};
