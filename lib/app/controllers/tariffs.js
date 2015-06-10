/**
 * Module dependencies.
 */

'use strict';

var mongoose = require('mongoose');
var Tariff = mongoose.model('Tariff');
var Plan = mongoose.model('Plan');
var utils = require('../../lib/utils');
var countries = require('../../utils/countries.json');
/**
 * Load by Id
 * @param {{}} req
 * @param {{}} res
 * @param {Function} next
 * @param {String} id
 */
exports.loadId = function (req, res, next, id) {
  Tariff.loadId(id, function (err, tariff) {
    if (err) {
      return next(err);
    }
    if (!tariff) {
      return next(new Error('Failed to load Tariff ' + id));
    }
    req.tariff = tariff;
    next();
  });
};

/**
 * Load by Name
 * @param {{}} req
 * @param {{}} res
 * @param {Function} next
 * @param {String} name
 */
exports.loadName = function (req, res, next, name) {
  Tariff.loadName(name, function (err, tariff) {
    if (err) {
      return next(err);
    }
    if (!tariff) {
      return next(new Error('Failed to load Tariff ' + id));
    }
    req.tariff = tariff;
    next();
  });
};

/**
 *
 * @param {{}} req
 * @param {{}} res
 */
exports.index = function (req, res) {
  'use strict';

  Tariff.allNotFree(function (err, tariffsNotFree) {
    if (err) {
      req.flash('info', 'Sorry! We are not able to find the tariffs!');
    }
    Tariff.allFree(function (err, tariffsFree) {
      if (err) {
        req.flash('info', 'Sorry! We are not able to find the tariffs!');
      }
      res.render('tariffs/index', {
        title: 'Tariffs',
        tariffsNotFree: tariffsNotFree,
        tariffsFree: tariffsFree
      });
    });
  });
};

/**
 *
 * @param {{}} req
 * @param {{}} res
 */
exports.payment = function (req, res) {
  'use strict';

  var tariff = req.tariff;
  res.render('tariffs/payment', {
    action: '/tariffs/' + tariff.name + '/create',
    title: 'Tariff details',
    countries: countries,
    tariff: tariff
  });
};

/**
 * Create payment
 * @param {{}} req
 * @param {{}} res
 */
exports.create = function (req, res) {

  var tariff = req.tariff;
  var plan = new Plan(req.body);
  plan.tariffPlan = tariff._id;

  plan.save(function (err) {
    'use strict';
    if (err) {
      return res.render('tariffs/payment', {
        action: '/tariffs/' + tariff.name + '/create',
        title: 'Tariff details',
        countries: countries,
        tariff: tariff,
        errors: utils.errors(err.errors),
        tariffError: req.body
      });
    }
    req.user.update({ $addToSet: { plans: { _id: plan._id } } }, {}, function (err) {
      if (err) {
        Plan.findOneAndRemove({ _id: plan._id }, function (err) {
          if (err) {
            res.send(500);
          }
          return res.render('/plan/payment', {
            action: '/tariffs/' + tariff.name + '/create',
            title: 'Tariff details',
            countries: countries,
            tariff: tariff,
            errors: utils.errors(err.errors),
            tariffError: req.body
          });
        });
      }
      return res.redirect('/users/' + req.user.id);
    });
  });

  /*
   var user = new User(req.body);
    user.provider = 'local';
   user.save(function(err) {
   if (err) {
   return res.render('users/signup', {
   error: utils.errors(err.errors),
   user: user,
   title: 'Sign up'
   });
   }
    // manually login the user once successfully signed up
   req.logIn(user, function(err) {
   if (err) req.flash('info', 'Sorry! We are not able to log you in!');
   return res.redirect('/');
   });
   });
   */
};

/**
 *  Show profile
 */
exports.show = function (req, res) {
  var user = req.profile;
  res.render('users/show', {
    title: user.name,
    user: user
  });
};
//# sourceMappingURL=tariffs.js.map