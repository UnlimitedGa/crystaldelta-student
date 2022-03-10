const User = require('../models/user');
const { hashSync, compareSync } = require('bcrypt');
const { convertToMongoObjectId, sendResponse } = require('../utility/common');
const { generateAuthTokens } = require('../utility/token.util');
// user login
exports.login = async (req, res) => {
  try {
    const {
      body: { email, password },
    } = req;
    // user query and project
    const userQuery = { email };
    const userProject = {};
    // get user details
    const user = await User.findOne(userQuery, userProject);
    // if user not found
    if (!user) {
      return sendResponse(res, 200, false, 'Email id Not found', null);
    }

    if (password !== user.password && compareSync(password, user.password)) {
      // await User.updateOne(
      //   { _id: convertToMongoObjectId(user._id) },
      //   updateData,
      // );

      //generate token
      const tokens = await generateAuthTokens({ user_id: user.user_id });

      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
        tokens,
      };
      return sendResponse(res, 200, true, 'Welcome to Crystal Delta', data);
    }
    return sendResponse(res, 200, false, 'Password not match', null);
  } catch (error) {
    return sendResponse(res, 500, false, 'Error Catch', error.toString());
  }
};
// user register
exports.register = async (req, res) => {
  try {
    const {
      body: { email, password, name },
    } = req;
    // user query and project
    const userQuery = { email };
    const userProject = {};
    // get user details
    const user = await User.findOne(userQuery, userProject);
    // if user not found
    if (user) {
      return sendResponse(res, 200, false, 'Email id already register', null);
    }
    const insertData = {
      email,
      password: hashSync(password, 10),
      name,
    };
    await User.create(insertData);
    return sendResponse(res, 200, true, 'Register successfully');
  } catch (error) {
    return sendResponse(res, 500, false, 'Error Catch', error.toString());
  }
};
//user logout
exports.logout = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    // get user details
    const user = await User.findOne({ _id: convertToMongoObjectId(id) }, {});
    // if user not found
    if (!user) return sendResponse(res, 200, false, 'User Not found', null);
    return sendResponse(res, 200, true, 'Logged out Successfully', null);
  } catch (error) {
    return sendResponse(res, 500, false, 'Server Error', error.toString());
  }
};
