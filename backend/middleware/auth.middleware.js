const passport = require('passport');

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if (err || info || !user) {
    return reject({
      status_code: 401,
      status: false,
      message: 'Please authenticate',
      data: 'Authentication code not matching',
    });
  }
  req.user = user;
  resolve();
};

const auth = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      'jwt',
      { session: false },
      verifyCallback(req, resolve, reject),
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => res.status(401).send(err));
};

module.exports = { auth };
