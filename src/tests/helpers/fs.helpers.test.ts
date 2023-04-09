import {
  getAllDirectoriesInDirectory,
  getAllFilesInDirectory,
  getDirectoryContent,
} from "../../helpers/fs.helper";
import { describe, expect, it } from "@jest/globals";
import * as path from "path";
import * as fs from "fs";

describe("getDirectoryContent", () => {
  const workingDirectory = "./test-directory";

  it("should return all items in the directory", async () => {
    const result = await getDirectoryContent(workingDirectory);

    expect(result).toHaveLength(3);
    expect(result).toContainEqual(
      expect.objectContaining({ name: "file1.txt" })
    );
    expect(result).toContainEqual(
      expect.objectContaining({ name: "file2.txt" })
    );
  });

  it("should return only files in the directory", async () => {
    const result = await getDirectoryContent(workingDirectory, true);

    expect(result).toHaveLength(2);
    expect(result).toContainEqual(
      expect.objectContaining({ name: "file1.txt" })
    );
    expect(result).toContainEqual(
      expect.objectContaining({ name: "file2.txt" })
    );
  });
});

describe("getAllFilesInDirectory", () => {
  const directoryPath = "./test-directory";

  it("should return all files in the directory", () => {
    const result = getAllFilesInDirectory(directoryPath);
    const fullPath = path.resolve(process.cwd(), directoryPath);

    expect(result).toHaveLength(2);
    expect(result).toContain(`${fullPath}\\file1.txt`);
    expect(result).toContain(`${fullPath}\\file2.txt`);
  });
});

describe("getAllDirectoriesInDirectory", () => {
  const directoryPath = "./test-directory";
  it("returns an array of directories for a valid directory path", () => {
    const directories = getAllDirectoriesInDirectory(directoryPath);

    expect(Array.isArray(directories)).toBe(true);
    expect(directories.length).toBeGreaterThan(0);

    directories.forEach((directoryPath) => {
      const stats = fs.statSync(directoryPath);
      expect(stats.isDirectory()).toBe(true);
    });
  });

  it("returns an empty array for an invalid directory path", () => {
    const directories = getAllDirectoriesInDirectory("./invalid-directory");
    expect(Array.isArray(directories)).toBe(true);
    expect(directories.length).toBe(0);
  });

  it("returns only directories, not files", () => {
    const directories = getAllDirectoriesInDirectory(directoryPath);
    directories.forEach((directoryPath) => {
      const stats = fs.statSync(directoryPath);
      expect(stats.isFile()).toBe(false);
    });
  });
});
