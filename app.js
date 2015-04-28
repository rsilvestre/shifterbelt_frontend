'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

/*!
 * nodejs-express-mongoose-demo
 * Copyright(c) 2013 Madhusudhan Srinivasa <madhums8@gmail.com>
 * MIT Licensed
 */
/**
 * Module dependencies
 */

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var app = _express2['default']();

// Connect to mongodb
var connect = function connect() {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  _mongoose2['default'].connect(_config2['default'].db, options);
};
connect();

_mongoose2['default'].connection.on('error', console.log);
_mongoose2['default'].connection.on('disconnected', connect);

// Bootstrap models
_fs2['default'].readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

// Bootstrap passport config
require('./config/passport')(_passport2['default'], _config2['default']);

// Bootstrap application settings
require('./config/express')(app, _passport2['default']);

// Bootstrap routes
require('./config/routes')(app, _passport2['default']);

/**
 * Expose
 */

module.exports = app;

//# sourceMappingURL=app.js.map