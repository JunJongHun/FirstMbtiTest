const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const port = 80;

app.use(express.static(path.join(__dirname, './frontend')));

app.get('/*', (req, res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Date: Date.now(),
  });
  res.sendFile(path.join(__dirname, './frontend', 'index.html'));
});

http.createServer(app).listen(port, () => {
  console.log(`app listening at ${port}`);
});
