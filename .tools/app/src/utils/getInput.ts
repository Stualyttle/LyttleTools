export const getInput = (question): Promise<string> => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(question + " ", (name) => {
      readline.close();
      resolve(name);
    });
  });
};
