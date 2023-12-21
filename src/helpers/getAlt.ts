export const getAltNameFromPath = (filePath: string): string => {
  const fileName = filePath.split("/").pop(); // Get the last part of the path (filename)
  const nameWithoutExtension = fileName?.split(".")[0]; // Remove the file extension

  if (nameWithoutExtension) {
    // Capitalize the first letter and replace dashes with spaces
    const formattedName = nameWithoutExtension.replace(/-/, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
    return formattedName;
  }

  return '';
};
