const { sign } = require('jsonwebtoken');
const cookie = require('cookie');

function authorize(req, res, next) {
  const { id } = req.params;
  console.log('authorizing');
  if (+req.user.id !== +id) {
    const error = new Error('Unauthorized. You do not have permission.');
    error.status = 401;
    throw error;
  }
  next();
}

function issueJWT(req, res, next) {
  const { user } = req;
  const claims = {
    sub: user.id,
  };
  const jwt = sign(claims, process.env.JWT_SECRET, {
    expiresIn: '144h',
  });
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('auth', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 360000,
      path: '/',
    })
  );
  next();
}

module.exports = { authorize, issueJWT };
