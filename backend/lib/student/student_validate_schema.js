const Joi = require('joi');

function getStudentSchema() {
  const schema = {
    params: {
      id: Joi.string().length(24),
    },
  };
  return schema;
}
function createTaskSchema() {
  const schema = {
    body: {
      userId: Joi.string().length(24),
      name: Joi.string(),
      description: Joi.string(),
    },
  };
  return schema;
}
function updateTaskSchema() {
  const schema = {
    params: {
      id: Joi.string().length(24),
    },
    body: {
      userId: Joi.string().length(24),
      name: Joi.string(),
      description: Joi.string(),
      status: Joi.string().valid(['completed', 'inCompleted']),
    },
  };
  return schema;
}
function deleteTaskSchema() {
  const schema = {
    params: {
      id: Joi.string().length(24),
    },
  };
  return schema;
}
module.exports = {
  getStudentSchema: getStudentSchema(),
  createTaskSchema: createTaskSchema(),
  updateTaskSchema: updateTaskSchema(),
  deleteTaskSchema: deleteTaskSchema(),
};
