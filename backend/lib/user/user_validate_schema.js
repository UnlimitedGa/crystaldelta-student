const Joi = require('joi');
//  login schema
function loginBodySchema() {
  const schema = {
    body: Joi.object().keys({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
      password: Joi.string().required(),
    }),
  };
  return schema;
}
/** register */
function registerBodySchema() {
  const schema = {
    body: Joi.object().keys({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
      password: Joi.string().required(),
      name: Joi.object().keys({
        first: Joi.string().required(),
        last: Joi.string().required(),
      }),
    }),
  };
  return schema;
}
// logout schema
function logoutBodySchema() {
  const schema = {
    params: Joi.object().keys({
      id: Joi.string().length(24),
    }),
  };
  return schema;
}

module.exports = {
  loginSchema: loginBodySchema(),
  logoutSchema: logoutBodySchema(),
  registerSchema: registerBodySchema(),
};
