const express = require('express');

const PORT = 8000;

const app = express();

app.get('/ping', (req, res) => {
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log('App is listening on port:', PORT);
});
