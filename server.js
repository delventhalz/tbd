const express = require('express');
const { getAllSongs, addSong } = require('./db.js');

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.get('/ping', (req, res) => {
  res.sendStatus(204);
});

app.get('/songs', (req, res) => {
  getAllSongs()
    .then((songs) => {
      res.status(200).send(songs)
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

app.post('/songs', (req, res) => {
  addSong(req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

app.listen(PORT, () => {
  console.log('App is listening on port:', PORT);
});
