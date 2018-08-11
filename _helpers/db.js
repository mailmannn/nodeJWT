const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://nodejwtdb/nodejwt', function(err){
  if(err){
    console.log('Please check that you have mongo installed or an environment variable "MONGO_URI" with a URL pointing to a running Mongo server.');
    throw err;
  }
});
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../modules/users/user.model'),
};