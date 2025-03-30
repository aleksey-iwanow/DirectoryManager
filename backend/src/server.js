const express = require('express');
const cors = require('cors');
const { upload } = require('./config/upload.js');
const { uploadFile, getFiles, getTree } = require('./controllers/uploadController.js')
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;

// Устанавливаем CORS политики
app.use(cors());

// POST endpoint для загрузки файлов
app.post('/upload', upload.single('file'), uploadFile);

// GET endpoint для получения содержимого файла или директории
app.get('/uploads/:filename(*)', getFiles);

// Маршрут для получения файла из директории uploads
app.get('/download/:filename(*)', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../uploads', filename);

  // Проверяем существование файла
  res.sendFile(filePath, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).send('Файл не найден: ' + filePath);
      }
      console.error('Ошибка при скачивании файла:', err);
      return res.status(500).send('Ошибка при скачивании файла');
    }
  });
});

// GET endpoint для получения дерева файлов
app.get('/tree/:filename(*)', getTree);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});