/**
 * Created by michaelsilvestre on 29/04/15
 */

import config from "config"
let utils = require(config.root + "/lib/utils.js");
import mongoose from "mongoose";
let Application = mongoose.model('Application');

/**
 * Load
 */

exports.load = (req, res, next, id) => {
  var User = mongoose.model('User');

  Application.load(id, req.user, (err, application) => {
    if (err) {
      return next(err);
    }
    if (!application) {
      return next(new Error('not found'));
    }
    req.application = application;
    next();
  });
};

/**
 * List
 */

exports.index = (req, res) => {
  Application.list({ criteria: { "users._id": req.user._id } }, function(err, applications) {
    if (err) return next(err);
    Application.count().exec(function(err, count) {
      res.render('applications/index', {
        title: 'Your Applications',
        applications: applications,
        count: count
      });
    });
  });
};

/**
 * New
 */

exports.new = (req, res) => {
  res.render('applications/new', {
    title: 'New application',
    application: new Application({})
  });
};

/**
 * Create an application
 */

exports.create = (req, res) => {
  var application = new Application(req.body);
  application.addUser(req.user, "owner", (err) => {
    if (!err) {
      req.flash('success', 'Successfully created application!');
      return res.redirect('/applications/' + application._id);
    }
    console.log(err);
    res.render('applications/new', {
      title: 'New Applications',
      application: application,
      errors: utils.errors(err.errors || err)
    });
  });
};

/**
 * Show
 */

exports.show = (req, res) => {
  res.render('applications/show', {
    title: req.application.name,
    application: req.application
  })
};

/**
 * Stats
 */

exports.stats = (req, res) => {
  res.render('applications/show', {
    title: req.application.name,
    application: req.application
  })
};
