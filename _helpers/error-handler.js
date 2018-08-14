const winston = require('./winston');

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        winston.console.log();
        winston.log('error', {Message:'ERROR ID:' + req.id + ' content:',  responseBody:JSON.stringify(err)});
        return res.status(400).json({ message: err });
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        winston.log('error', {Message:'Mongoose ERROR ID:' + req.id + ' content:',  responseBody:JSON.stringify(err)});
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        winston.log('error', {Message:'JWT ERROR ID:' + req.id + ' content:',  responseBody:JSON.stringify(err)});
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    winston.log('error', {Message:'Default ERROR  - ID:' + req.id + ' content:',  responseBody:JSON.stringify(err)});
    return res.status(500).json({ message: err.message });
}

module.exports = errorHandler;