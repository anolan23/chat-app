const express = require('express');
const passport = require('passport');

const { authorize } = require('../config/middlewares');
const db = require('../db');
const Users = require('../db/repo/Users.js');

const router = express.Router();

router.get(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
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
  }
);

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

router.patch(
  '/api/users/:id',
  passport.authenticate('jwt', { session: false }),
  authorize,
  async (req, res) => {
    try {
      const { id } = req.params;
      const cols = req.body;
      const user = await Users.update(id, cols);
      res.send(user);
    } catch (error) {
      res.status(error.status || 500).send({ error: error.message });
    }
  }
);

module.exports = router;
