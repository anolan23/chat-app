require('dotenv').config();
const express = require('express');
const passport = require('passport');
const jwtStrategy = require('./config/strategy.js');
const path = require('path');
const authRouter = require('./routes/auth.js');

const app = express();
const port = process.env.PORT || 8080;
const html = path.join(__dirname, '..', 'build', 'index.html');

passport.use(jwtStrategy);

app.use(passport.initialize());
app.use(express.json());

app.use(authRouter);

app.get('/', (req, res) => {
  res.sendFile(html);
});

app.use(express.static(path.join(__dirname, '..', 'build')));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
