// Derived from http://www.9bitstudios.com/2015/10/basic-authentication-in-node-js-express-applications-and-apis/

var basicAuth = require('basic-auth');
 
exports.basicAuthentication = function(request, response, next) {
 
    function unauthorized(response) {
        response.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return response.send(401);
    };
 
    var user = basicAuth(request);
 
    if (!user || !user.name || !user.pass) {
        return unauthorized(response);
    };
 
    if (user.name === 'sumo' && user.pass === 'sumo') {
        return next();
    } else {
        return unauthorized(response);
    };
     
};

