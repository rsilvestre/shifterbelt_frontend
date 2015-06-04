/**
 * Created by michaelsilvestre on 1/06/15
 */

"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var Schema = _mongoose2["default"].Schema;

var priceGreaterThanZero = function priceGreaterThanZero(price) {
  "use strict";
  return price >= 0;
};

/**
 * Application Schema
 * @type {*|Schema}
 */
var TariffSchema = new Schema({
  name: { type: String, required: "A name should be setted", index: true, unique: "Name cannot be blank", trim: true },
  description: { type: String, required: "A description should be provided" },
  connection: { type: Number, required: "A number of connection should be setted" },
  message: { type: Number, requirde: "A number of message should be setted" },
  price: [{
    value: { type: Number, required: "A price cannot be null", validate: [priceGreaterThanZero, "The price should be bigger than zero"] },
    createdAt: { type: Date, "default": Date.now }
  }],
  createdAt: { type: Date, "default": Date.now }
});

/**
 * Static
 * @type {{}}
 */
TariffSchema.statics = {

  /**
   *
   * @param {String} id
   * @param {Function} cb
   */
  loadId: function loadId(id, cb) {
    "use strict";

    this.findOne({ _id: id }).exec(cb);
  },

  /**
   *
   * @param {String} name
   * @param {Function} cb
   */
  loadName: function loadName(name, cb) {
    "use strict";

    this.findOne({ name: name }).exec(cb);
  },

  /**
   *
   * @param {Function} cb
   */
  all: function all(cb) {
    "use strict";

    this.find().exec(cb);
  },

  /**
   *
   * @param {Function} cb
   */
  allNotFree: function allNotFree(cb) {
    "use strict";

    this.find({ "price": { $elemMatch: { "value": { $gt: 0 } } } }, {}, { sort: { "price.value": -1 } }).exec(cb);
  },

  /**
   *
   * @param {Function} cb
   */
  allFree: function allFree(cb) {
    "use strict";

    this.find({ "price": { $elemMatch: { "value": { $eq: 0 } } } }).exec(cb);
  }
};

_mongoose2["default"].model("Tariff", TariffSchema);

//# sourceMappingURL=tariff.js.map