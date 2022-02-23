require('dotenv').config();
const express = require('express');
const http = require('http');
const passport = require('passport');
const path = require('path');
const authRouter = require('./routes/auth.js');
const usersRouter = require('./routes/users.js');
const channelsRouter = require('./routes/channels.js');
const messagesRouter = require('./routes/messages.js');
const photosRouter = require('./routes/photos.js');
const { googleStrategy, facebookStrategy } = require('./config/strategies');
const { Server } = require('socket.io');
const Messages = require('./db/repo/Messages.js');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 8080;
const html = path.join(__dirname, '..', 'build', 'index.html');

require('./config/passport.js')(passport);
passport.use(googleStrategy);
passport.use(facebookStrategy);

app.use(passport.initialize());
app.use(express.json());

app.use(authRouter);
app.use(usersRouter);
app.use(channelsRouter);
app.use(messagesRouter);
app.use(photosRouter);

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use('/api/photos', express.static(path.join(__dirname, 'photos')));

app.get('*', (req, res) => {
  res.sendFile(html);
});

io.on('connection', (socket) => {
  console.log('New connection!');
  socket.broadcast.emit('action', 'User has joined channel');

  socket.on('sendMessage', async (message, callback) => {
    try {
      const createdMsg = await Messages.create(message);
      io.emit('message', createdMsg);
      callback();
    } catch (error) {
      callback(error);
    }
  });

  socket.on('disconnect', () => {
    io.emit('action', 'User has left channel');
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
