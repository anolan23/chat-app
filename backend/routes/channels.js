const express = require('express');

const Channels = require('../db/repo/Channels');

const router = express.Router();

router.get('/api/channels', async (req, res) => {
  try {
    const channels = await Channels.find();
    res.send(channels);
  } catch (error) {
    res.status(error.status || 500).send({ error: error.message });
  }
});

router.get('/api/channels/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const channel = Channels.findOneById(id);
    res.send(channel);
  } catch (error) {
    res.status(error.status || 500).send({ error: error.message });
  }
});

router.post('/api/channels', async (req, res) => {
  try {
    const channel = req.body;
    const channels = await Channels.create(channel);
    res.send(channels);
  } catch (error) {
    res.status(error.status || 500).send({ error: error.message });
  }
});

module.exports = router;
