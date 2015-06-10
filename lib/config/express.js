'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _helperGenUuidJs = require('../helper/genUuid.js');

var _helperGenUuidJs2 = _interopRequireDefault(_helperGenUuidJs);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _swig = require('swig');

var _swig2 = _interopRequireDefault(_swig);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _swigExtras = require('swig-extras');

var _swigExtras2 = _interopRequireDefault(_swigExtras);

var _nodeSyntaxhighlighter = require('node-syntaxhighlighter');

var _nodeSyntaxhighlighter2 = _interopRequireDefault(_nodeSyntaxhighlighter);

var _universalAnalytics = require('universal-analytics');

var _universalAnalytics2 = _interopRequireDefault(_universalAnalytics);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _sessionstore = require('sessionstore');

var _sessionstore2 = _interopRequireDefault(_sessionstore);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _csurf = require('csurf');

var _csurf2 = _interopRequireDefault(_csurf);

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _connectFlash = require('connect-flash');

var _connectFlash2 = _interopRequireDefault(_connectFlash);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _viewHelpers = require('view-helpers');

var _viewHelpers2 = _interopRequireDefault(_viewHelpers);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _packageJson = require('../package.json');

var _packageJson2 = _interopRequireDefault(_packageJson);

var env = process.env.MODE_ENV || 'development';

/**
 * expost
 * @param app
 * @param passport
 */
module.exports = function (app, passport) {

  app.use((0, _compression2['default'])({
    threshold: 512
  }));

  // Use winston on production
  var log = undefined;
  if (env !== 'development') {
    log = {
      stream: {
        write: function write(message, encoding) {
          _winston2['default'].info(message);
        }
      }
    };
  } else {
    log = 'dev';
  }

  var redisURL = _url2['default'].parse(process.env.REDISCLOUD_URL || 'redis://localhost:6379');
  var client = _redis2['default'].createClient(redisURL.port, redisURL.hostname, { no_ready_check: true });
  if (redisURL.auth) {
    client.auth(redisURL.auth.split(':')[1]);
  }

  // view engine setup
  app.set('views', '' + _config2['default'].root + '/app/views');
  app.engine('swig', _swig2['default'].renderFile);
  app.set('view engine', 'swig');

  _swig2['default'].setFilter('length', function (input) {
    if (Object.prototype.toString.call(input) === '[object Array]') {
      return input.length;
    }
  });

  _swig2['default'].setFilter('moment', function (input) {
    return (0, _moment2['default'])(input).fromNow();
  });

  _swig2['default'].setFilter('lastPrice', function (input) {
    return input.slice(-1)[0]['value'];
  });

  _swig2['default'].setFilter('numberize', function (input) {
    return ('' + input).split('').reverse().map(function (value, index) {
      if ((index + 1) % 3 === 0) {
        return ',' + value;
      }
      return value;
    }).reverse().join('').replace(/^,/, '');
  });

  var sample = function sample(input) {
    var language = _nodeSyntaxhighlighter2['default'].getLanguage('js');

    return _nodeSyntaxhighlighter2['default'].highlight(input.replace(/end/g, '\n').replace(/tabulation\:/g, '\t'), language, {
      brush: 'js',
      gutter: false
    });
  };
  sample.safe = true;
  _swig2['default'].setFilter('sample', sample);

  _swigExtras2['default'].useFilter(_swig2['default'], 'markdown');

  app.use(_universalAnalytics2['default'].middleware('UA-', { coockieName: '_ga' }));

  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.ico'));
  if (env !== 'test') {
    app.use((0, _morgan2['default'])(log));
  }
  app.use(_bodyParser2['default'].json());
  app.use(_bodyParser2['default'].urlencoded({ extended: false }));
  app.use((0, _cookieParser2['default'])());
  app.use(_express2['default']['static']('' + _config2['default'].root + '/public'));
  app.use((0, _methodOverride2['default'])('_method'));

  app.use((0, _expressSession2['default'])({
    genid: function genid(req) {
      return (0, _helperGenUuidJs2['default'])(); // use UUIDs for session IDs
    },
    secret: process.env.SESSION_SECRET || 'hello world',
    name: 'tiny_cookie',
    store: _sessionstore2['default'].createSessionStore(process.env.REDISCLOUD_URL ? { url: process.env.REDISCLOUD_URL } : {
      type: 'redis',
      host: 'localhost', // optional
      port: 6379, // optional
      prefix: 'sess', // optional
      ttl: 804600, // optional
      timeout: 10000 // optional
    }),
    resave: true,
    saveUninitialized: true
  }));

  app.use((0, _multer2['default'])({
    dest: './uploads/',
    rename: function rename(fieldname, filename) {
      return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
    },
    limits: {
      fieldNameSize: 50,
      fieldSize: 4000000,
      files: 2,
      fields: 10
    }
  }));

  // use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  // connect flash for flash messages - shoud be declared after sessions
  app.use((0, _connectFlash2['default'])());

  // should be declared after session ans flash
  app.use((0, _viewHelpers2['default'])(_packageJson2['default'].name));

  // adds CSRF support
  if (env !== 'test') {
    app.use((0, _csurf2['default'])());

    app.use(function (req, res, next) {
      res.locals.csrf_token = req.csrfToken();
      next();
    });
  }

  app.use(function (req, res, next) {
    res.locals.pkg = _packageJson2['default'];
    res.locals.env = env;
    next();
  });

  app.use(function (req, res, next) {
    req.visitor.pageview(req.originalUrl).send();
    next();
  });

  /*
   // catch 404 and forward to error handler
   app.use(function (req, res, next) {
   var err = new Error('Not Found');
   err.status = 404;
   next(err);
   });
   */
  // error handlers

  // development error handler
  // will print stacktrace
  if (env === 'development' || env === 'test') {
    app.set('view cache', false);
    _swig2['default'].setDefaults({ cache: false });
    /*
     app.use(function (err, req, res, next) {
      console.error(err.message);
     console.error(err.stack);
     res.status(err.status || 500);
     res.render('error_template', {
     title: 'Internal error',
     message: err.message,
     error: err
     });
     });
     */
  }

  /*
   // production error handler
   // no stacktraces leaked to user
   app.use(function (err, req, res, next) {
   res.status(err.status || 500);
   res.render('error', {
   message: err.message,
   error: {}
   });
   });
   */
};
//# sourceMappingURL=express.js.map