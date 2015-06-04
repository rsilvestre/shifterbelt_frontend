/**
 * Created by michaelsilvestre on 30/05/15
 */

import config from "config"
let utils = require(config.root + "/lib/utils.js");
import mongoose from "mongoose";

exports.index = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/applications');
  }
  res.render('homepage/index', {
    title: 'Homepage'
  });
};
