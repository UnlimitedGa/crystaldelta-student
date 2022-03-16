require('dotenv').config();
module.exports = {
  APP_STATE: process.env.NODE_ENV || 'development',
  MONGO_DB: process.env.dbUrl,
};
