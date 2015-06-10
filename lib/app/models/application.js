/**
 * Module dependencies.
 */

'use strict';

var shortid = require('shortid');
var config = require('config');
var utils = require(config.root + '/lib/utils.js');
var mongoose = require('mongoose');
var crypto = require('crypto');
var token = require('token');

token.defaults.secret = 'uj1k9iEq7LYNCFlLU0AZS2MEfYKGVVif8OpPBNc1';
token.defaults.timeStep = 24 * 60 * 60; // 24h in seconds

var Schema = mongoose.Schema;

var makeSalt = function makeSalt() {
  'use strict';

  return Math.round(new Date().valueOf() * Math.random()) + '';
};

var encryptPassword = function encryptPassword(password) {
  'use strict';

  if (!password) {
    return '';
  }
  try {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  } catch (err) {
    return '';
  }
};

var Generator = function Generator(preSave) {

  if (false === this instanceof Generator) {
    return new Generator(preSave);
  }

  var Application = mongoose.model('Application');

  this.businessId = function (cb) {
    var businessId = makeSalt();
    Application.find({ 'businessId': businessId }).select('businessId').exec(function (err, result) {
      if (err) {
        return cb(err);
      }

      if (result.length > 0) {
        return generate(cb);
      }
      preSave.businessId = businessId;
      cb();
    });
  };

  this.keys = function (cb) {
    'use strict';

    var keyGen = function keyGen(type) {
      return {
        role: type,
        key: crypto.createHmac('sha1', Math.random().toString()).update(new Date().valueOf().toString()).digest('hex').substring(0, 40),
        passwd: token.generate(new Date().valueOf().toString() + '|' + Math.random().toString()).substring(0, 80)
      };
    };
    preSave.keys.push(new keyGen('master'));
    preSave.keys.push(new keyGen('manager'));
    preSave.keys.push(new keyGen('slave'));
    cb();
  };
};
/**
 * Getter
 */

var getBusinessId = function getBusinessId(businessId) {
  'use strict';
  return businessId;
};

/**
 * Setter
 */

var setBusinessId = function setBusinessId(businessId) {
  'use strict';
  if (this.isNew) {
    return businessId;
  }
  return this.businessId;
};

/**
 * Application Schema
 */

var ApplicationSchema = new Schema({
  name: { type: String, required: true, trim: true, index: true, unique: 'Name cannot be blank' },
  businessId: { type: String, index: true, unique: true },
  strategy: { type: String, required: 'The strategy has not been defined', 'enum': ['direct', 'work'] },
  users: [{
    _id: { type: Schema.ObjectId, ref: 'User', required: true },
    role: { type: String, required: true, 'enum': ['owner', 'manager', 'invited'] },
    createdAt: { type: Date, 'default': Date.now }
  }],
  createdAt: { type: Date, 'default': Date.now },
  keys: [{
    role: { type: String, required: true, 'enum': ['master', 'manager', 'slave'] },
    key: { type: String, required: true },
    passwd: { type: String, required: true },
    createdAt: { type: Date, 'default': Date.now },
    status: { type: String, 'default': 'active', 'enum': ['active', 'inactive', 'revoked'] }
  }]
});

/**
 * Virtuals
 */

/**
 * Validations
 */

/**
 * Pre-save hook
 */

ApplicationSchema.pre('save', function (next) {
  'use strict';

  if (!this.isNew) {
    return next();
  }

  var generator = new Generator(this);

  generator.businessId(function () {
    generator.keys(next);
  });
});

/**
 * Methods
 */

ApplicationSchema.methods = {
  addUser: function addUser(user, role, cb) {
    'use strict';
    var notify = require('../mailer');
    this.users.push({
      _id: user._id,
      role: role
    });

    notify.createApplication({
      application: this,
      currentUser: user
    });

    this.save(cb);
  }, /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */

  authenticate: function authenticate(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: makeSalt,

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: encryptPassword
};

/**
 * Statics
 */
ApplicationSchema.statics = {
  /**
   *
   * @param id
   * @param cb
   * @api public
   */
  load: function load(id, user, cb) {
    'use strict';
    this.findOne({ businessId: id }).populate('users._id', 'name email username').exec(cb);
  },

  list: function list(options, cb) {
    'use strict';

    var criteria = options.criteria || {};

    this.find(criteria).populate('users._id', 'name email username').exec(cb);
  },

  /**
   *
   * @param businessId
   * @param cb
   * @api public
   */
  selectByBusinessId: function selectByBusinessId(businessId, cb) {
    'use strict';
    this.findOne({ businessId: businessId }).populate('users._id', 'name email username').select('name').exec(cb);
  }
};

mongoose.model('Application', ApplicationSchema);
//# sourceMappingURL=application.js.map