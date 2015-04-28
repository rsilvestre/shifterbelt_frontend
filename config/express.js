'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _favicon = require('serve-favicon');

var _favicon2 = _interopRequireDefault(_favicon);

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

var _genUuid = require('../helper/genUuid.js');

var _genUuid2 = _interopRequireDefault(_genUuid);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _swig = require('swig');

var _swig2 = _interopRequireDefault(_swig);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _extras = require('swig-extras');

var _extras2 = _interopRequireDefault(_extras);

var _ua = require('universal-analytics');

var _ua2 = _interopRequireDefault(_ua);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _session = require('express-session');

var _session2 = _interopRequireDefault(_session);

var _sessionStore = require('sessionstore');

var _sessionStore2 = _interopRequireDefault(_sessionStore);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _csrf = require('csurf');

var _csrf2 = _interopRequireDefault(_csrf);

var _mongoStore = require('connect-mongo');

var _mongoStore2 = _interopRequireDefault(_mongoStore);

var _flash = require('connect-flash');

var _flash2 = _interopRequireDefault(_flash);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _helpers = require('view-helpers');

var _helpers2 = _interopRequireDefault(_helpers);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _pkg = require('../package.json');

var _pkg2 = _interopRequireDefault(_pkg);

var env = process.env.MODE_ENV || 'development';

/**
 * expost
 * @param app
 * @param passport
 */
module.exports = function (app, passport) {

    app.use(_compression2['default']({
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
        return _moment2['default'](input).fromNow();
    });

    _extras2['default'].useFilter(_swig2['default'], 'markdown');

    app.use(_ua2['default'].middleware('UA-', { coockieName: '_ga' }));

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    if (env !== 'test') {
        app.use(_morgan2['default'](log));
    }
    app.use(_bodyParser2['default'].json());
    app.use(_bodyParser2['default'].urlencoded({ extended: false }));
    app.use(_cookieParser2['default']());
    app.use(_express2['default']['static']('' + _config2['default'].root + '/public'));
    app.use(_methodOverride2['default']('_method'));

    app.use(_session2['default']({
        genid: function genid(req) {
            return _genUuid2['default'](); // use UUIDs for session IDs
        },
        secret: process.env.SESSION_SECRET || 'hello world',
        name: 'tiny_cookie',
        store: _sessionStore2['default'].createSessionStore(process.env.REDISCLOUD_URL ? { url: process.env.REDISCLOUD_URL } : {
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

    app.use(_multer2['default']({
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
    app.use(_flash2['default']());

    // should be declared after session ans flash
    app.use(_helpers2['default'](_pkg2['default'].name));

    // adds CSRF support
    if (env !== 'test') {
        app.use(_csrf2['default']());

        app.use(function (req, res, next) {
            res.locals.csrf_token = req.csrfToken();
            next();
        });
    }

    app.use(function (req, res, next) {
        res.locals.pkg = _pkg2['default'];
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