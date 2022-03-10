const mongoose = require('mongoose');
module.exports = {
  sendResponse(res, code, status, message, data) {
    const response_function = (
      status_code,
      api_status,
      toast_message,
      result_message,
    ) => {
      const server_response = {
        status_code,
        status: api_status,
        message: toast_message,
        data: result_message,
      };
      return server_response;
    };
    return res
      .status(code)
      .send(response_function(code, status, message, data));
  },
  convertToMongoObjectId: (id) => mongoose.Types.ObjectId(id),
};
