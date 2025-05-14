const path = require('path');
const fs = require('fs');
const {getUploadsPath, readFileContent, readDirectoryContent} = require('../config/filesTools')
const scanDirectory = require('../config/scanDirectory')

module.exports.downloadFile = (req, res) => {
  const { filename } = req.params;
  const filePath = getUploadsPath(filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).send('Файл не найден: ' + filePath);
      }
      console.error('Ошибка при скачивании файла:', err);
      return res.status(500).send('Ошибка при скачивании файла');
    }
  });
};

module.exports.uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    res.json({ message: 'File uploaded successfully.', file: req.file });
}

module.exports.getFiles = async (req, res) => {
    const { filename } = req.params;
    const fullPath = getUploadsPath(filename);

    await fs.stat(fullPath, async (err, stats) => {
        if (err) {
            console.error(err);
            return res.status(404).json({ message: 'Resource not found.' });
        }

        if (stats.isFile()) {
            await readFileContent(fullPath, res);
        } else if (stats.isDirectory()) {
            await readDirectoryContent(fullPath, res);
        } else {
            return res.status(400).json({ message: 'Invalid resource type.' });
        }
    });
}

module.exports.getTree = async (req, res) => {
    const { filename } = req.params;
    const fullPath = getUploadsPath(filename);
    try{
        const tree = await scanDirectory(fullPath);
        res.status(200).json(tree);
        
    }
    catch (err){
        console.error(err);
        res.status(400).json({ message: 'Invalid load tree.' })
    }

}