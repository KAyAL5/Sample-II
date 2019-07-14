const expressJwt = require('express-jwt');
const config = require('./config.js');
//const unAuth = require('../routes/user.route');
const userCtrl = require('../controllers/user.controller');

function jwt() {
    const secret = config.jwt.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/user/register',
            '/user/authenticate'
        ]
    });
}

async function isRevoked(req, payload, done) {
    var auth = expressJwt({
        secret: config.jwt.secret,
        id: payload.id
      });
    const user = await userCtrl.getUserById(payload.id);
    // const token = req.cookies.token || req.body.token || req.query.token || req.headers['x-access-token'] ;
    if (req.headers.authorization) {
        // return of(new HttpResponse({ status: 200, body: [user] }));
        done();
    } else {
        // return 401 not authorised if token is null or invalid
        return done(null, true);;
    }
    // let token = undefined;
    // if(req.cookies && req.cookies.token) {
    //     token = req.cookies.token;
    // } else if (req.body.token) {
    //     token = req.body.token;
    // } else if (req.query && req.query.token) {
    //     token = req.query.token;
    // }
    
    console.log('Token: ' + req.headers.authorization);
    // // revoke token if user no longer exists
    // if (!user) {
    //     return done(null, true);
    // }
    
    // done();
};

module.exports = jwt;