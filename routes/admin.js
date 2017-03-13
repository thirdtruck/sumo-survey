var express = require('express');
var router = express.Router();
var basicAuthentication = require('../lib/authentication').basicAuthentication;

/* GET admin page */
router.get('/', basicAuthentication, function(req, res, next) {
  res.render('admin');
});

module.exports = router;
