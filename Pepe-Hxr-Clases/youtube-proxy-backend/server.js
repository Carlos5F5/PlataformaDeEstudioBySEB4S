const express = require('express');
const cors = require('cors');
const { execFile } = require('child_process');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(cors());

const YTDLP_PATH = path.join(__dirname, 'herramientas', 'yt-dlp.exe');

app.get('/api/youtube-proxy', (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: 'Missing URL' });

  const args = ['-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]', '-g', videoUrl];

  execFile(YTDLP_PATH, args, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr || error.message });
    }

    const [video, audio] = stdout.trim().split('\n');
    res.json({ videoUrl: video, audioUrl: audio });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
