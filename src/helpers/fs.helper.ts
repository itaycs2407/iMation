const fs = require("fs");

export const getDirectoryContent = async (
  workingDirectory: string,
  onlyFiles: boolean = false
) => {
  const allItems = fs.readdirSync(workingDirectory, { withFileTypes: true });
  return onlyFiles ? allItems.filter((item: any) => item.isFile()) : allItems;
};
