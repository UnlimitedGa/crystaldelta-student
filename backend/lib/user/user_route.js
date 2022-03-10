const express = require('express');
const route = express.Router();
const { validate } = require('../../middleware/validation');
const {
  loginSchema: { body: loginBodySchema },
  registerSchema: { body: registerBodySchema },
  logoutSchema: { params: logoutParamsSchema },
} = require('./user_validate_schema');
const { login, register, logout } = require('./user_controller');

route.post(
  '/login',
  validate([{ schema: loginBodySchema, property: 'body' }]),
  login,
);
route.post(
  '/register',
  validate([{ schema: registerBodySchema, property: 'body' }]),
  register,
);

route.post(
  '/logout/:id',
  validate([{ schema: logoutParamsSchema, property: 'body' }]),
  logout,
);

module.exports = route;
