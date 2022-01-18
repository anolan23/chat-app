require('dotenv').config();
const express = require('express');
const passport = require('passport');
const path = require('path');
const authRouter = require('./routes/auth.js');
const usersRouter = require('./routes/users.js');
const photosRouter = require('./routes/photos.js');
const { googleStrategy, facebookStrategy } = require('./config/strategies');

const app = express();
const port = process.env.PORT || 8080;
const html = path.join(__dirname, '..', 'build', 'index.html');

require('./config/passport.js')(passport);
passport.use(googleStrategy);
passport.use(facebookStrategy);

app.use(passport.initialize());
app.use(express.json());

app.use(authRouter);
app.use(usersRouter);
app.use(photosRouter);

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use('/api/photos', express.static(path.join(__dirname, 'photos')));

app.get('*', (req, res) => {
  res.sendFile(html);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
