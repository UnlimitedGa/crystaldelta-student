/**
 * Module dependencies.
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const { APP_STATE } = require('./lib/utility/util_keys');

const passport = require('passport');
const {
  passportConfig: { jwtStrategy },
} = require('./config');

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.options('*', cors());
app.use(cors());

/**
 * Link models with
 * mongoDB database
 */

require('./lib/models')(app);

/**
 * routes application
 */

require('./lib/routes')(app);

/**
 * Load auth routes and
 * login strategies with
 * passport
 */
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

/**
 * GET index page.
 */

app.get('*', function (req, res) {
  res.render('index', {
    title: 'CrystalDelta-Api',
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  const isProduction = APP_STATE === 'production';
  // console.log(isProduction);
  res.status(err.status || 500).json({
    status_code: 500,
    status: false,
    message: 'App Crashed',
    data: err.message,
    ...(isProduction ? {} : { error: err }),
  });
});

module.exports = app;
