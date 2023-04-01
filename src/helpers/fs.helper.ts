const fs = require("fs");

export const getAllDirectories = async (workingDirectory: string) => {
  return fs.readdirSync(workingDirectory, { withFileTypes: true });
};
