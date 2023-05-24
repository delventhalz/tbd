const express = require('express');
const pg = require('pg');

const PORT = process.env.PORT || 8000;
const DB_PASSWORD = process.env.DB_PASSWORD;

const app = express();
const pool = new pg.Pool({
  host: 'db.bit.io',
  port: 5432,
  ssl: true,
  database: 'delventhalz/trial',
  user: 'songs',
  password: DB_PASSWORD
});

app.use(express.json());

app.get('/ping', (req, res) => {
  res.sendStatus(204);
});

app.get('/songs', (req, res) => {
  let query = 'SELECT * FROM "songs";';

  pool.query(query)
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

app.post('/songs', (req, res) => {
  let song = req.body;

  let query = `
    INSERT INTO "songs" ("rank", "artist", "track", "published")
    VALUES ('${song.rank}', '${song.artist}', '${song.track}', '${song.published}');
  `;

  pool.query(query)
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
