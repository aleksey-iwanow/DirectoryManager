const fs = require('fs');
const path = require('path');

async function scanDirectory(directoryPath) {
  try {
    const entries = await fs.promises.readdir(directoryPath, { withFileTypes: true });
    
    const result = [];

    for (let entry of entries) {
      const entryPath = path.join(directoryPath, entry.name);
      
      if (entry.isFile()) {
        result.push({
          name: entry.name,
        });
      } else if (entry.isDirectory()) {
        const children = await scanDirectory(entryPath);
        result.push({
          name: entry.name,
          childrens: children,
        });
      }
    }
    
    return result;
  } catch (error) {
    console.error("Ошибка при сканировании директории:", error);
    throw error;
  }
}

module.exports = scanDirectory;