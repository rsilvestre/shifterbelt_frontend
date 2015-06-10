/**
 * Created by michaelsilvestre on 30/05/15
 */

"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _config = require("config");

var _config2 = _interopRequireDefault(_config);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var utils = require(_config2["default"].root + "/lib/utils.js");

exports.index = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/applications");
  }
  res.render("homepage/index", {
    title: "Homepage"
  });
};
//# sourceMappingURL=homepage.js.map