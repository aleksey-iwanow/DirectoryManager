const fs = require('fs');
const { console } = require('inspector');
const path = require('path');
const getLocalPath = require('./getLocalPath');
const {fileTypeFromStream} = require('file-type');


module.exports.getUploadsPath = (filename) => {
    return path.join(__dirname, '../../uploads', filename);
}

function getPreviousFolder(path) {
  const parts = path.split('/');
  parts.pop();

  if (parts.length > 0) {
      return parts.join('/').slice(1);
  }

  return '';
}

const isImage = (extName) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
  return imageExtensions.includes(extName.toLowerCase());
};


// Функция для чтения содержимого файла
module.exports.readFileContent = async (filePath, res) => {
  await fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error.' });
    }

    const extName = filePath.slice(filePath.lastIndexOf('.') + 1);
    const isTextFile = !isImage(extName);
    const sizeInMB = (data.length / (1024)).toFixed(2); // Размер в МБ
    let countLines = 0;

    if (isTextFile) {
      countLines = data.toString().split('\n').length; // Количество строк
    }

    return res.status(200).json({ 
      data: isTextFile ? data.toString() : getLocalPath(filePath), 
      extName: extName, 
      isImage: !isTextFile,
      name: path.basename(filePath),
      isFolder: false,
      size: sizeInMB, // Размер файла в МБ
      countLines: isTextFile ? countLines : null // Количество строк, если это текст
    });
  });
};

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
