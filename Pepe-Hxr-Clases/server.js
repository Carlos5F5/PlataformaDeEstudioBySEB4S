// server.js
const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/stream', (req, res) => {
  const youtubeUrl = req.query.url;

  if (!youtubeUrl) {
    return res.status(400).send('Falta el parámetro "url".');
  }

  exec(`yt-dlp -f best -g "${youtubeUrl}"`, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Error con yt-dlp:', stderr);
      return res.status(500).send('Error al procesar video.');
    }

    const directUrl = stdout.trim();
    res.json({ streamUrl: directUrl });
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor proxy activo en http://localhost:${PORT}`);
});
