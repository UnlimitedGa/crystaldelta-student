const express = require('express');
const route = express.Router();
const { validate } = require('../../middleware/validation');
const {
  getStudentSchema: { params: getStudentParamsSchema },
  createTaskSchema: { body: createTaskBodySchema },
  updateTaskSchema: {
    params: updateTaskParamsSchema,
    body: updateTaskBodySchema,
  },
  deleteTaskSchema: { params: deleteTaskParamsSchema },
} = require('./student_validate_schema');
const {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
  getTask,
} = require('./student_controller');

route.get(
  '/:id/tasks',
  validate([{ schema: getStudentParamsSchema, property: 'params' }]),
  getTasks,
);
route.get(
  '/:id',
  validate([{ schema: getStudentParamsSchema, property: 'params' }]),
  getTask,
);
route.post(
  '/',
  validate([{ schema: createTaskBodySchema, property: 'body' }]),
  createTask,
);
route.put(
  '/:id',
  validate([
    { schema: updateTaskParamsSchema, property: 'params' },
    { schema: updateTaskBodySchema, property: 'body' },
  ]),
  updateTask,
);
route.delete(
  '/:id',
  validate([{ schema: deleteTaskParamsSchema, property: 'params' }]),
  deleteTask,
);

module.exports = route;
