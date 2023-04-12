import {
  getAllDirectoriesInDirectory,
  getAllFilesInDirectory,
} from "./helpers/fs.helper";
import { ItemData } from "./types/shared";

const fs = require("fs");
const path = require("path");

export const copyFiles = (
  sourceFilesDirectory: string,
  sourceDirectoryDirectories: string
) => {
  const allFiles = getAllFilesInDirectory(sourceFilesDirectory);
  const allDirectories = getAllDirectoriesInDirectory(
    sourceDirectoryDirectories
  );

  const FilesData = getItemsData(allFiles, true);
  const DirectoriesData = getItemsData(allDirectories);

  for (const file of FilesData) {
    const {
      fullPath: filePath,
      hebrewName: fileHebrewName,
      name: filename,
    } = file;

    let didFindMatch = false;

    for (const directory of DirectoriesData) {
      const { fullPath: directoryPath, hebrewName: directoryHebrewName } =
        directory;

      if (fileHebrewName === directoryHebrewName) {
        didFindMatch = true;
        fs.cpSync(filePath, path.resolve(directoryPath, filename));
      }
    }

    if (!didFindMatch) {
      console.log(`Didn't find match for ${fileHebrewName}`);
    }
  }
};

const getItemsData = (items: string[], files = false): ItemData[] => {
  return items.map((item) => {
    const name = item.split("\\").at(-1) ?? "";

    const hebrewName = files
      ? (item.split("\\").at(-1) || "").split(".")[0] ?? ""
      : item.split("\\").at(-1) ?? "";

    return {
      fullPath: item,
      name,
      hebrewName: extractHebrewName(hebrewName),
    };
  });
};

const extractHebrewName = (name: string) =>
  name.replace(/[0-9a-zA-Z_\-'":\\/]/g, "");
