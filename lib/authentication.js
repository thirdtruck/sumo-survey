var basicAuth = require('basic-auth');

function unauthorized(response) {
  response.set('WWW-Authenticate', 'Basic realm=Authorization Required');
  return response.send(401);
}

exports.basicAuthentication = function(request, response, next) {
  var user = basicAuth(request);

  if (!user || !user.name || !user.pass) {
    return unauthorized(response);
  }

  if (user.name === 'sumo' && user.pass === 'sumo') {
    return next();
  }

  return unauthorized(response);
};
