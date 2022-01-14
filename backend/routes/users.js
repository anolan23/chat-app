const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/api/users', async (req, res) => {
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

router.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query(
      `
    SELECT *
    FROM users
    WHERE id = $1
    `,
      [id]
    );
    const [user] = rows;
    delete user.password;
    res.send(user);
  } catch (error) {
    res.status(error.status || 500).send({ error: error.message });
  }
});

module.exports = router;
