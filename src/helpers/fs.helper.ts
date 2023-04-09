import * as fs from "fs";
import * as path from "path";

export const getDirectoryContent = async (
  workingDirectory: string,
  onlyFiles: boolean = false
) => {
  const allItems = fs.readdirSync(workingDirectory, { withFileTypes: true });
  return onlyFiles ? allItems.filter((item: any) => item.isFile()) : allItems;
};

export function getAllDirectoriesInDirectory(directoryPath: string): string[] {
  if (fs.existsSync(directoryPath) === false) {
    return [];
  }

  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((item: fs.Dirent) => item.isDirectory())
    .map((item: fs.Dirent) => path.resolve(directoryPath, item.name));
}

export function getAllFilesInDirectory(directoryPath: string): string[] {
  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((item: fs.Dirent) => !item.isDirectory())
    .map((item: fs.Dirent) => path.resolve(directoryPath, item.name));
}

export const verifyDirectory = (directoryPath: string) => {
  return fs.existsSync(directoryPath);
};
