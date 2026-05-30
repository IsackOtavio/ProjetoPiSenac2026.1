const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });
const certificados = [];

app.use(cors());
app.use(express.json());

app.post('/upload', upload.single('arquivo'), (req, res) => {
  const { nome, horas, categoria } = req.body;
  certificados.push({ nome, horas, categoria, arquivo: req.file.filename });
  res.status(201).json({ message: 'Certificado enviado com sucesso' });
});

app.get('/certificados', (req, res) => {
  res.json(certificados);
});

app.post('/login', (req, res) => {
  const { senha } = req.body;
  if (senha === '123456') {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));