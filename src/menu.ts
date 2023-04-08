const figlet = require("figlet");
const inquirer = require("inquirer");

console.clear();
console.log(figlet.textSync("i MATION"));
const enum Choices {
  CopyFilesToDirectories = "Copy files to directories",
  Exit = "Exit",
}

const questions = [
  {
    type: "list",
    message: "Select test to run",
    name: "testToRun",
    choices: [Choices.CopyFilesToDirectories, Choices.Exit],
  },
  {
    type: "input",
    message: "Enter files directory",
    name: "filesDirectory",
    when: (answers: any) =>
      answers.testToRun === Choices.CopyFilesToDirectories,
  },
  {
    type: "input",
    message: "Enter directories directory",
    name: "directoriesDirectory",
    when: (answers: any) =>
      answers.testToRun === Choices.CopyFilesToDirectories,
  },
  {
    type: "confirm",
    message: "Ready to start ?",
    name: "start",
  },
];

inquirer.prompt(questions).then((answers: any) => {
  console.log(answers);
  const { testToRun, filesDirectory, directoriesDirectory, start } = answers;
  if (!start) {
    console.log("Exiting...");
    return;
  }
  switch (testToRun) {
    case Choices.CopyFilesToDirectories:
      console.log("Copying files to directories");
      break;
    case Choices.Exit:
      console.log("Exiting...");
      break;
  }
});
