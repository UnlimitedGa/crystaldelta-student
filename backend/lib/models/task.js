const mongoose = require('mongoose');
const Schemas = mongoose.Schema;
const constant = require('../utility/constants');

const userSchemas = new Schemas(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
    },
    description: String,
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model(constant.TASK, userSchemas);
