const path = require('path');
const fs = require('fs');
const {getUploadsPath, readFileContent, readDirectoryContent} = require('../config/filesTools')
const scanDirectory = require('../config/scanDirectory')

module.exports.uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    res.json({ message: 'File uploaded successfully.', file: req.file });
}

module.exports.getFiles = (req, res) => {
    const { filename } = req.params;
    const fullPath = getUploadsPath(filename);

    fs.stat(fullPath, (err, stats) => {
        if (err) {
            console.error(err);
            return res.status(404).json({ message: 'Resource not found.' });
        }

        if (stats.isFile()) {
            readFileContent(fullPath, res);
        } else if (stats.isDirectory()) {
            readDirectoryContent(fullPath, res);
        } else {
            return res.status(400).json({ message: 'Invalid resource type.' });
        }
    });
}

module.exports.getTree = (req, res) => {
    const { filename } = req.params;
    const fullPath = getUploadsPath(filename);
    try{
        const treePromise = scanDirectory(fullPath);
        treePromise.then(tree => {
            res.status(200).json(tree);
        })
        
    }
    catch (err){
        console.error(err);
        res.status(400).json({ message: 'Invalid load tree.' })
    }

}