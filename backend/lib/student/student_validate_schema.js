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
      completed: Joi.boolean(),
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
      completed: Joi.boolean(),
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
