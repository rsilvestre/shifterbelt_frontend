/**
 * Module dependencies.
 */

'use strict';

var mongoose = require('mongoose');
var Notifier = require('notifier');
var config = require('config');

/**
 * Process the templates using swig - refer to notifier#processTemplate method
 *
 * @param {String} tplPath
 * @param {Object} locals
 * @return {String}
 * @api public
 */

Notifier.prototype.processTemplate = function (tplPath, locals) {
  var swig = require('swig');
  locals.filename = tplPath;
  return swig.renderFile(tplPath, locals);
};

/**
 * Expose
 */

module.exports = {

  /**
   * Comment notification
   *
   * @param {Object} options
   * @param {Function} cb
   * @api public
   */

  comment: function comment(options, cb) {
    var article = options.article;
    var author = article.user;
    var user = options.currentUser;
    var notifier = new Notifier(config.notifier);

    var obj = {
      to: author.email,
      from: 'your@product.com',
      subject: user.name + ' added a comment on your article ' + article.title,
      alert: user.name + ' says: "' + options.comment,
      locals: {
        to: author.name,
        from: user.name,
        body: options.comment,
        article: article.name
      }
    };
    // for apple push notifications
    /*notifier.use({
     APN: true
     parseChannels: ['USER_' + author._id.toString()]
     })*/

    try {
      notifier.send('comment', obj, cb);
    } catch (err) {
      console.log(err);
    }
  },

  /**
   * New Application notification
   *
   * @param {Object} options
   * @param {Function} cb
   * @api public
   */
  createApplication: function createApplication(options, cb) {
    'use strict';
    var application = options.application;
    var user = options.currentUser;
    var notifier = new Notifier(config.notifier);

    var obj = {
      to: user.email,
      from: config.email.noreply.email,
      subject: 'New application created',
      alert: '' + user.name + ' create a new application named ' + application.name,
      locals: {
        to: user.name,
        from: config.email.noreply.name,
        body: application.name,
        application: application.name
      }
    };
    // for apple push notifications
    /*notifier.use({
     APN: true
     parseChannels: ['USER_' + author._id.toString()]
     })*/

    try {
      notifier.send('createApplication', obj, cb);
    } catch (err) {
      console.log(err);
    }
  }
};
//# sourceMappingURL=index.js.map