import express  from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from'body-parser';

import fs from "fs"
import path from 'path';

import mongoose from "mongoose"

import genUuid from "../helper/genUuid.js"

import url from "url";

import swig from "swig";
import moment from 'moment';
import extras from "swig-extras";

import ua from 'universal-analytics';

import methodOverride from "method-override";

import multer from "multer";

import redis from "redis";
import session from "express-session";
import sessionStore from "sessionstore";

import compression from "compression";

import csrf from "csurf";
import mongoStore from "connect-mongo";
import flash from "connect-flash";
import winston from "winston";
import helpers from "view-helpers";

import config from "config";

import pkg from "../package.json";

let env = process.env.MODE_ENV || "development";

/**
 * expost
 * @param app
 * @param passport
 */
module.exports = function(app, passport) {

    app.use(compression({
        threshold: 512
    }));

    // Use winston on production
    let log;
    if (env !== 'development') {
        log = {
            stream: {
                write: function (message, encoding) {
                    winston.info(message);
                }
            }
        };
    } else {
        log = 'dev';
    }

    var redisURL = url.parse(process.env.REDISCLOUD_URL || 'redis://localhost:6379');
    var client = redis.createClient(redisURL.port, redisURL.hostname, { no_ready_check: true });
    if (redisURL.auth) {
        client.auth(redisURL.auth.split(":")[1]);
    }

    // view engine setup
    app.set('views', `${config.root}/app/views`);
    app.engine('swig', swig.renderFile);
    app.set('view engine', 'swig');

    swig.setFilter('length', (input) => {
        if (Object.prototype.toString.call(input) === '[object Array]') {
            return input.length;
        }
    });

    swig.setFilter('moment', (input) => {
        return moment(input).fromNow();
    });

    extras.useFilter(swig, 'markdown');

    app.use(ua.middleware('UA-', { coockieName: '_ga' }));

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    if (env !== 'test') {
        app.use(morgan(log));
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(`${config.root}/public`));
    app.use(methodOverride("_method"));

    app.use(session({
        genid: function (req) {
            return genUuid(); // use UUIDs for session IDs
        },
        secret: process.env.SESSION_SECRET || 'hello world',
        name: "tiny_cookie",
        store: sessionStore.createSessionStore(process.env.REDISCLOUD_URL ? { url: process.env.REDISCLOUD_URL } : {
            type: 'redis',
            host: 'localhost',         // optional
            port: 6379,                // optional
            prefix: 'sess',            // optional
            ttl: 804600,               // optional
            timeout: 10000             // optional
        }),
        resave: true,
        saveUninitialized: true
    }));

    app.use(multer({
        dest: './uploads/',
        rename: function (fieldname, filename) {
            return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
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
    app.use(flash());

    // should be declared after session ans flash
    app.use(helpers(pkg.name));

    // adds CSRF support
    if (env !== 'test') {
        app.use(csrf());

        app.use((req, res, next) => {
            res.locals.csrf_token = req.csrfToken();
            next();
        });
    }

    app.use((req, res, next) => {
        res.locals.pkg = pkg;
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
        swig.setDefaults({ cache: false });
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

