/*!
 * Module dependencies.
 */

"use strict";

var fs = require("fs");
var env = {};
var envFile = "" + __dirname + "/env.json";

var baseUrl = "localhost:3000";

// Read env.json file, if it exists, load the id`s and secrets from that
// Note that this is only in the development env
// it is not safe to store id`s in files

if (fs.existsSync(envFile)) {
  env = fs.readFileSync(envFile, "utf-8");
  env = JSON.parse(env);
  Object.keys(env).forEach(function (key) {
    process.env[key] = env[key];
  });
}

/**
 * Expose
 */

module.exports = {
  db: process.env.MONGOHQ_URL,
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
  },
  email: {
    noreply: {
      name: "Shifterbelt.com",
      email: "noreply@shifterbelt.com"
    }
  }
};

//# sourceMappingURL=development.js.map