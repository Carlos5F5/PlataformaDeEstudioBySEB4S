const express = require('express');
const cors = require('cors');
const http = require('http');
const https = require('https');
const { URL } = require('url');

const app = express();
const PORT = 8080;

const REMOTE_BASE_URL = 'http://40.233.0.159:25000/';

app.use(cors());

app.get('/videos/:file', (req, res) => {
    const file = req.params.file;
    const range = req.headers.range;

    if (!range) {
        return res.status(416).send('Range header required');
    }

    const remoteUrl = new URL(file, REMOTE_BASE_URL);
    const client = remoteUrl.protocol === 'https:' ? https : http;

    const options = {
        headers: {
            Range: range
        }
    };

    client.get(remoteUrl, options, (response) => {
        res.writeHead(response.statusCode, response.headers);
        response.pipe(res);
    }).on('error', (err) => {
        console.error('Proxy error:', err.message);
        res.sendStatus(500);
    });
});

app.listen(PORT, () => {
    console.log(`✅ Proxy server running at http://localhost:${PORT}`);
});
