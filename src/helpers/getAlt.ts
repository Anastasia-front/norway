export const getAltNameFromPath = (filePath: string): string => {
  const fileName = filePath.split("/").pop(); // Get the last part of the path (filename)

  if (fileName) {
    // Remove the file extension
    const nameWithoutExtension = fileName.split("-")[0];
    
    // Split the name into words based on capital letters and dashes
    const words = nameWithoutExtension
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capital letters
      .split(/\s+/); // Split into words

    // Capitalize the first letter of each word
    const formattedName = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return formattedName;
  }

  return '';
};
