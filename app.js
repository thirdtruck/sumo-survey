const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const response = require('./routes/response');
const admin = require('./routes/admin');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  secret: 'secret string',
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/response', response);
app.use('/admin', admin);

// catch 404 and forward to error handler
function on404(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
}

app.use(on404);

// error handler
function onError(err, req, res) {
  // set locals, only providing error in development
  const locals = res.locals;
  locals.message = err.message;
  locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}

app.use(onError);

module.exports = app;
