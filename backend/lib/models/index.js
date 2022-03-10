/*
 *  Module dependencies
 */

const mongoose = require('mongoose');
const { MONGO_DB } = require('../utility/util_keys');
/**
 * Expose models linker helper
 *
 * @param {Express} app `Express` instance
 */

module.exports = function models() {
  /*
   *  Connect to mongo
   */
  mongoose.connect(MONGO_DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
  });
};
