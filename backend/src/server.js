const express = require('express');
const cors = require('cors');
const { upload } = require('./config/upload.js');
const { uploadFile, getFiles, getTree } = require('./controllers/uploadController.js')
const app = express();
const PORT = process.env.PORT || 8080;

// Устанавливаем CORS политики
app.use(cors());

// POST endpoint для загрузки файлов
app.post('/upload', upload.single('file'), uploadFile);

// GET endpoint для получения содержимого файла или директории
app.get('/uploads/:filename(*)', getFiles);

// GET endpoint для получения дерева файлов
app.get('/tree/:filename(*)', getTree);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});