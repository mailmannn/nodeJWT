require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const kardiaMDW = require ('./modules/kardia/kardiaMDW');
const compression = require('compression');
const mung = require('express-mung');
const uuid = require('uuid/v4');

//Helpers
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
const winston = require('./_helpers/winston');

//MDW
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(compression());
app.use(helmet());

//set an unique id for each request
app.use(function(req, res, next) {
    req.id = uuid();
    next();
});

//set morgan token
morgan.token('id', function getId (req) {
    return req.id;
  });

//Loggers res
app.use(mung.json(
    function transform(body, req, res) {
        winston.log('info', {Message:req.id + ' - API REQUEST RESPONSE LOG ID:' ,  responseBody:JSON.stringify(body)});
        return body;
    }
));
//log requests
app.use(morgan('dev', {
    skip(req, res) { return res.statusCode < 400 ;}
  }));

app.use(morgan(':id [:date[clf]] :method :url :response-time', {stream: winston.stream}));

//metrics
app.use(kardiaMDW);

// MDW -  JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./modules/users/users.controller'));

// global error handler MWD
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    //console.log('Server listening on port ' + port);
});
