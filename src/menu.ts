import { copyFiles } from "./copyFiles";
import { verifyDirectory } from "./helpers/fs.helper";

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
    message: "Select action to run",
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
  const { testToRun, filesDirectory, directoriesDirectory, start } = answers;
  if (!start) {
    console.log("Exiting...");
    return;
  }
  switch (testToRun) {
    case Choices.CopyFilesToDirectories:
      if (
        verifyDirectory(filesDirectory) === false ||
        verifyDirectory(directoriesDirectory) === false
      ) {
        console.log("One of the directories is not valid");
        return;
      }
      console.log(
        `copy files from ${filesDirectory} to ${directoriesDirectory}`
      );
      copyFiles(filesDirectory, directoriesDirectory);
      console.log(
        `finished copy files from ${filesDirectory} to ${directoriesDirectory}`
      );
      break;
    case Choices.Exit:
      console.log("Exiting...");
      break;
  }
});
