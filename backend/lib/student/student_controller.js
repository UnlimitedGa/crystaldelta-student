const Tasks = require('../models/task');
const { convertToMongoObjectId, sendResponse } = require('../utility/common');

exports.getTasks = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const tasks = await Tasks.find({ userId: convertToMongoObjectId(id) }, {});

    if (!tasks && tasks.length <= 0)
      return sendResponse(res, 200, false, 'Task Not found', null);

    return sendResponse(res, 200, true, 'Get all tasks', tasks);
  } catch (error) {
    return sendResponse(res, 500, false, 'Server Error', error.toString());
  }
};

exports.createTask = async (req, res) => {
  try {
    const {
      body: { userId, name, description },
    } = req;

    const insertData = {
      userId,
      description,
      name,
    };
    await Tasks.create(insertData);
    return sendResponse(res, 200, true, 'Task created successfully');
  } catch (error) {
    return sendResponse(res, 500, false, 'Server Error', error.toString());
  }
};

exports.updateTask = async (req, res) => {
  try {
    const {
      body: { userId, name, description, status },
      params: { id },
    } = req;
    let updateData = {};
    if (userId && description && name)
      updateData = {
        userId,
        description,
        name,
      };
    if (status) {
      updateData.status = status;
    }
    await Tasks.updateOne({ _id: convertToMongoObjectId(id) }, updateData);
    return sendResponse(res, 200, true, 'Task updated successfully');
  } catch (error) {
    return sendResponse(res, 500, false, 'Server Error', error.toString());
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    await Tasks.deleteOne({ _id: convertToMongoObjectId(id) });
    return sendResponse(res, 200, true, 'Task deleted successfully');
  } catch (error) {
    return sendResponse(res, 500, false, 'Server Error', error.toString());
  }
};
