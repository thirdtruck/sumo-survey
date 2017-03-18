const basicAuth = require('basic-auth');

function unauthorized(response) {
  response.set('WWW-Authenticate', 'Basic realm=Authorization Required');
  return response.send(401);
}

function basicAuthentication(request, response, next) {
  const user = basicAuth(request);

  if (!user || !user.name || !user.pass) {
    return unauthorized(response);
  }

  if (user.name === 'sumo' && user.pass === 'sumo') {
    return next();
  }

  return unauthorized(response);
}

exports.basicAuthentication = basicAuthentication;
