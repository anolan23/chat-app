const express = require('express');

const Messages = require('../db/repo/Messages');

const router = express.Router();

router.get('/api/messages', async (req, res) => {
  try {
    const { channelId } = req.query;
    if (!channelId) {
      const messages = await Messages.find();
      res.send(messages);
    } else {
      const messages = await Messages.findByChannelId(channelId);
      res.send(messages);
    }
  } catch (error) {
    res.status(error.status || 500).send({ error: error.message });
  }
});

router.get('/api/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const message = Messages.findOneById(id);
    res.send(message);
  } catch (error) {
    res.status(error.status || 500).send({ error: error.message });
  }
});

router.post('/api/messages', async (req, res) => {
  try {
    const message = req.body;
    const messages = await Messages.create(message);
    res.send(messages);
  } catch (error) {
    res.status(error.status || 500).send({ error: error.message });
  }
});

module.exports = router;
