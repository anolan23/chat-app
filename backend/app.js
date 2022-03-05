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
const { googleStrategy } = require('./config/strategies');
const { Server } = require('socket.io');
const Messages = require('./db/repo/Messages.js');
const {
  addMember,
  removeMember,
  getMember,
  getMembersByChannelId,
  leaveChannel,
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 8080;
const html = path.join(__dirname, '..', 'build', 'index.html');

require('./config/passport.js')(passport);
passport.use(googleStrategy);

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

  socket.on('join', (user, channelId, callback) => {
    if (!user.name) return;
    leaveChannel(io, socket);
    const result = addMember({ ...user, socketId: socket.id }, channelId);
    if (result.error) {
      callback(result.error);
      return;
    }

    socket.join(result.channelId);

    socket.broadcast
      .to(result.channelId)
      .emit('action', `${result.name} has joined channel ${result.channelId}`);
    io.to(result.channelId).emit(
      'members',
      getMembersByChannelId(result.channelId)
    );
    callback();
  });

  socket.on('sendMessage', async (message, callback) => {
    try {
      const member = getMember(socket.id);
      if (!member) return;
      const createdMsg = await Messages.create(message);

      io.to(member.channelId).emit('message', createdMsg);
      callback();
    } catch (error) {
      callback(error);
    }
  });

  socket.on('disconnect', () => {
    leaveChannel(io, socket);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
