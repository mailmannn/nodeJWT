const winston = require('winston');

require('winston-papertrail').Papertrail;
var logger = new winston.transports.Papertrail({
    host: 'logs7.papertrailapp.com', // you get this from papertrail account
    port: 44872, //you get this from papertrail account
    colorize: true,
    handleExceptions: true
  });
module.exports = logger;