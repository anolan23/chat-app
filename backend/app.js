require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const port = process.env.PORT || 8080;
const html = path.join(__dirname, '..', 'build', 'index.html');
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(html);
});
app.get('/api/users', async (req, res) => {
  try {
    const { rows } = await db.query(
      `
    SELECT *
    FROM users
    `,
      []
    );
    res.send(rows);
  } catch (error) {
    res.status(error.status || 500).send({ error: error.message });
  }
});
app.post('/api/signup', async (req, res) => {
  try {
    const { name, bio, phone, email, password } = req.body;
    const { rows } = await db.query(
      `
      INSERT INTO users(name, bio, phone, email, password)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
        `,
      [name, bio, phone, email, password]
    );
    res.send(rows[0]);
  } catch (error) {
    res.status(error.status || 500).send({ error: error.message });
  }
});

app.use(express.static(path.join(__dirname, '..', 'build')));
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
