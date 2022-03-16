/**
 * Expose routes
 *
 * @param {Express} app `Express` instance.
 * @api public
 */

const { authMiddleware } = require('../../middleware');

const cors = require('cors');

module.exports = function routes(app) {
  app.use(cors());
  const version = { v1: '/api/v1', v2: '/api/v2' };
  const student = require('../student/student_route');
  const user = require('../user/user_route');
  app.use(version.v1 + '/student', authMiddleware, student);
  app.use(version.v1 + '/user', user);
};
