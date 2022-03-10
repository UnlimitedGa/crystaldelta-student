const mongoose = require('mongoose');
const Schemas = mongoose.Schema;
const constant = require('../utility/constants');

const userSchemas = new Schemas(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    name: {
      first: {
        type: String,
        trim: true,
      },
      last: {
        type: String,
        trim: true,
      },
    },
    password: String,
  },
  { timestamps: true },
);
module.exports = mongoose.model(constant.USER, userSchemas);
