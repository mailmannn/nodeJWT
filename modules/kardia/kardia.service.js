var Kardia = require('kardia');
var conf = require('./conf.json');
var kardia = Kardia.start({ name: conf.appname, host: '0.0.0.0', port: 12900 });

module.exports = kardia;