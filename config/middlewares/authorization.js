
/*
 *  Generic require login routing middleware
 */

exports.requiresLogin = function (req, res, next) {
  "use strict";

  if (req.isAuthenticated()) {
    return next();
  }
  if (req.method === 'GET') {
    req.session.returnTo = req.originalUrl;
  }
  res.redirect('/login');
};

/*
 *  User authorization routing middleware
 */

exports.user = {
  hasAuthorization: function (req, res, next) {
    "use strict";

    if (req.profile.id !== req.user.id) {
      req.flash('info', 'You are not authorized');
      return res.redirect('/users/' + req.profile.id);
    }
    next();
  }
};

/**
 *  Article authorization routing middleware
 */

exports.article = {
  hasAuthorization: function (req, res, next) {
    "use strict";

    if (req.article.user.id !== req.user.id) {
      req.flash('info', 'You are not authorized');
      return res.redirect('/articles/' + req.article.id);
    }
    next();
  }
};

/**
 * Application authorization routing middleware
 */

exports.application = {
  hasAuthorization: function(req, res, next) {
    "use strict";

    if (req.application.users.indexOf(req.user.id) > -1) {
      req.flash('info', 'You are not authorized');
      return res.redirect("/applications/" + req.application.id);
    }
    next();
  }
};

/**
 * Comment authorization routing middleware
 */

exports.comment = {
  hasAuthorization: function (req, res, next) {
    "use strict";

    // if the current user is comment owner or article owner
    // give them authority to delete
    if (req.user.id === req.comment.user.id || req.user.id === req.article.user.id) {
      next();
    } else {
      req.flash('info', 'You are not authorized');
      res.redirect('/articles/' + req.article.id);
    }
  }
};
