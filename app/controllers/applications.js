"use strict";

var _interopRequireDefault = function(obj) {
  return obj && obj.__esModule ? obj : { "default": obj };
};

/**
 * Created by michaelsilvestre on 29/04/15
 */

var _config = require("config");

var _config2 = _interopRequireDefault(_config);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var utils = require(_config2["default"].root + "/lib/utils.js");

var Application = _mongoose2["default"].model("Application");

/**
 * Load
 */

exports.load = function(req, res, next, id) {
  var User = _mongoose2["default"].model("User");

  Application.load(id, req.user, function(err, application) {
    if (err) return next(err);
    if (!application) return next(new Error("not found"));
    req.application = application;
    next();
  });
};

/**
 * List
 */

exports.index = function(req, res) {
  Application.list({ criteria: { "users.user": req.user._id } }, function(err, applications) {
    if (err) return next(err);
    Application.count().exec(function(err, count) {
      res.render("applications/index", {
        title: "Applications",
        applications: applications,
        count: count
      });
    });
  });
};

/**
 * New
 */

exports["new"] = function(req, res) {
  res.render("applications/new", {
    title: "New application",
    application: new Application({})
  });
};

/**
 * Create an application
 */

exports.create = function(req, res) {
  var application = new Application(req.body);
  application.addUser(req.user, "owner", function(err) {
    if (!err) {
      req.flash("success", "Successfully created application!");
      return res.redirect("/applications/" + application._id);
    }
    console.log(err);
    res.render("applications/new", {
      title: "New Applications",
      application: application,
      errors: utils.errors(err.errors || err)
    });
  });
};

/**
 * Show
 */

exports.show = function(req, res) {
  res.render("applications/show", {
    title: req.application.name,
    application: req.application
  });
};

//# sourceMappingURL=applications.js.map