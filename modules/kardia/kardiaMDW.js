var kardia = require ('./kardia.service.js');

function kardiaMDW (req, res, next){
    kardia.increment("totalReq", 1);
    //not working
    //kardia.throughput("reqMetrics");
    next();
}


module.exports = kardiaMDW;