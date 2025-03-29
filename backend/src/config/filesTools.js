const fs = require('fs');
const { console } = require('inspector');
const path = require('path');
const getLocalPath = require('./getLocalPath');

module.exports.getUploadsPath = (filename) => {
    return path.join(__dirname, '../../uploads', filename);
}


// Функция для чтения содержимого файла
module.exports.readFileContent = (filePath, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error.' });
    }
    // Возвращаем содержимое файла
    return res.status(200).json({ 
      data: data.toString(), 
      type: filePath.slice(filePath.lastIndexOf('.') + 1), 
      name: path.basename(filePath),
      isFolder: false 
    });
  });
};

function getPreviousFolder(path) {
    const parts = path.split('/');
    parts.pop();

    if (parts.length > 0) {
        return parts.join('/').slice(1);
    }

    return '';
}

// Функция для чтения содержимого директории
module.exports.readDirectoryContent = async (dirPath, res) => {
  try{
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
    result = []
    for (let entry of entries) {
      result.push({
        name: entry.name,
        path: getLocalPath(path.join(dirPath, entry.name)).slice(1),
        isFolder: entry.isDirectory(),
      });
    }
    return res.status(200).json({
      data: result,
      parentPath: getPreviousFolder(getLocalPath(dirPath)),
      name: path.basename(dirPath),
      isFolder: true,
    });
  }
  catch (err){
    console.error(err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
