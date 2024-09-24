import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { upload } from './uploadMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();


//Servign html page on default route
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.json({ message: 'File uploaded successfully', filename: req.file.filename });
  } else {
    res.status(400).json({ message: 'No file uploaded' });
  }
});

router.get('/files', async (req, res) => {
  try {
    const files = await fs.readdir('uploads');
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: 'Error reading files', error: error.message });
  }
});

router.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);
  res.download(filePath, (err) => {
    if (err) {
      res.status(404).json({ message: 'File not found' });
    }
  });
});

router.put('/rename/:oldFilename', async (req, res) => {
  const { oldFilename } = req.params;
  const { newFilename } = req.body;
  const oldPath = path.join(__dirname, 'uploads', oldFilename);
  const newPath = path.join(__dirname, 'uploads', newFilename);

  try {
    await fs.rename(oldPath, newPath);
    res.json({ message: 'File renamed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error renaming file', error: error.message });
  }
});

router.delete('/delete/:filename', async (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);

  try {
    await fs.unlink(filePath);
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting file', error: error.message });
  }
});

export default router;