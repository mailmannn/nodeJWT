const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../modules/users/user.service');

async function isRevoked(req, payload, done) {
    const id = payload.sub;
    const user = await userService.getById(id);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }
    
    done();
};

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register'
        ]
    });
}

module.exports = jwt;