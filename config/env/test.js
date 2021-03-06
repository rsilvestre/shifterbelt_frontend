"use strict";

var baseUrl = "localhost:3000";

/**
 * Expose
 */

module.exports = {
  db: "mongodb://localhost/noobjs_test",
  facebook: {
    clientID: process.env.FACEBOOK_CLIENTID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "http://" + baseUrl + "/auth/facebook/callback"
  },
  twitter: {
    clientID: process.env.TWITTER_CLIENTID,
    clientSecret: process.env.TWITTER_SECRET,
    callbackURL: "http://" + baseUrl + "/auth/twitter/callback"
  },
  github: {
    clientID: process.env.GITHUB_CLIENTID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: "http://" + baseUrl + "/auth/github/callback"
  },
  linkedin: {
    clientID: process.env.LINKEDIN_CLIENTID,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: "http://" + baseUrl + "/auth/linkedin/callback"
  },
  google: {
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "http://" + baseUrl + "/auth/google/callback"
  }
};

//# sourceMappingURL=test.js.map