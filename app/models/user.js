/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var crypto = require('crypto');
var async = require('async');

var Schema = mongoose.Schema;
var oAuthTypes = [
  'github',
  'twitter',
  'facebook',
  'google',
  'linkedin'
];

var validateEmail = function(email) {
  "use strict";

  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

/**
 * User Schema
 */
var UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  name: { type: String, default: '' },
  username: { type: String, default: '' },
  provider: { type: String, default: '' },
  tariffPlan: { type: String, default: '', enum: ['', 'plan1', 'plan2', 'plan3', 'plan4', 'plan5', 'custom'] },
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' },
  authToken: { type: String, default: '' },
  facebook: {},
  twitter: {},
  github: {},
  google: {},
  linkedin: {},
  applications: [{ applicationId: { type: Schema.ObjectId, ref: "Application" } }],
  firstname: { type: String },
  lastname: { type: String },
  phonenumber: { type: String },
  addresses: [{
    typeAddress: { type: String },
    street: { type: String },
    number: { type: String },
    town: { type: String },
    postcode: { type: String },
    country: { type: String },
    createdAt: { type: Date, default: Date.now }
  }],
  plans: [{
    planId: { type: Schema.ObjectId, ref: 'Plan' },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

/**
 * Virtuals
 */

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

/**
 * Validations
 */

var validatePresenceOf = function(value) {
  "use strict";

  return value && value.length;
};

// the below 5 validations only apply if you are signing up traditionally

UserSchema.path('name').validate(function(name) {
  if (this.skipValidation()) {
    return true;
  }
  return name.length;
}, 'Name cannot be blank');

UserSchema.path('email').validate(function(email) {
  if (this.skipValidation()) {
    return true;
  }
  return email.length;
}, 'Email cannot be blank');

UserSchema.path('email').validate(function(email, fn) {
  var User = mongoose.model('User');
  if (this.skipValidation()) {
    fn(true);
  }

  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('email')) {
    User.find({ email: email }).exec(function(err, users) {
      fn(!err && users.length === 0);
    });
  } else {
    fn(true);
  }
}, 'Email already exists');

UserSchema.path('username').validate(function(username) {
  if (this.skipValidation()) {
    return true;
  }
  return username.length;
}, 'Username cannot be blank');

UserSchema.path('hashed_password').validate(function(hashed_password) {
  if (this.skipValidation()) {
    return true;
  }
  return hashed_password.length;
}, 'Password cannot be blank');


/**
 * Pre-save hook
 */

UserSchema.pre('save', function(next) {
  if (!this.isNew) {
    return next();
  }

  if (!validatePresenceOf(this.password) && !this.skipValidation()) {
    next(new Error('Invalid password'));
  } else {
    next();
  }
});

/**
 * Methods
 */

UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password) {
      return '';
    }
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  /**
   * Validation is not required if using OAuth
   */
  skipValidation: function() {
    return ~oAuthTypes.indexOf(this.provider);
  }
};

/**
 * Statics
 */

UserSchema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function(options, cb) {
    var Tariff = mongoose.model('Tariff');
    options.select = options.select || 'name username email plans';
    this.findOne(options.criteria)
      .populate({
        path: 'plans',
        options: { sort: { createdAt: -1 }, limit: 1 }
      })
      .select(options.select)
      .exec(function(err, data) {
        "use strict";

        if (err) {
          return cb(err, null);
        }
        if (!data.hasOwnProperty('plans')) {
          return cb(null, data);
        }
        async.forEach(data.plans, function(plan, callback) {
          Tariff.populate(plan, { path: "tariffPlan" }, function(err, output) {
            if (err) {
              return cb(err, null);
            }

            //return cb(null, data);
            callback();
          });
        }, function(err) {
          if (err) {
            return cb(err);
          }
          return cb(null, data);
        });
      });
  }
};

mongoose.model('User', UserSchema);
