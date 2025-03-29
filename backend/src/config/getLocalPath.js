const path = require('path');

function getLocalPath(fullPath, indexPath="uploads") {
  const uploadsIndex = fullPath.indexOf(indexPath);

  if (uploadsIndex !== -1) {
    return fullPath.substring(uploadsIndex + indexPath.length).replace(/\\/g, '/');
  }
  
  return fullPath.replace(/\\/g, '/');
}

module.exports = getLocalPath;