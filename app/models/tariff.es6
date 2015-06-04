/**
 * Created by michaelsilvestre on 1/06/15
 */

import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let priceGreaterThanZero = (price) => {
  "use strict";
  return price >= 0;
};

/**
 * Application Schema
 * @type {*|Schema}
 */
let TariffSchema = new Schema({
  name: { type: String, required: "A name should be setted", index: true, unique: "Name cannot be blank", trim: true },
  description: { type: String, required: "A description should be provided" },
  connection: { type: Number, required: "A number of connection should be setted" },
  message: { type: Number, requirde: "A number of message should be setted" },
  price: [{
    value: { type: Number, required: "A price cannot be null", validate:[ priceGreaterThanZero, "The price should be bigger than zero"] },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
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
  loadId: function(id, cb) {
    "use strict";

    this.findOne({_id: id})
      .exec(cb);
  },

  /**
   *
   * @param {String} name
   * @param {Function} cb
   */
  loadName: function(name, cb) {
    "use strict";

    this.findOne({name: name})
      .exec(cb);
  },

  /**
   *
   * @param {Function} cb
   */
  all: function(cb) {
    "use strict";

    this.find()
      .exec(cb);
  },

  /**
   *
   * @param {Function} cb
   */
  allNotFree: function(cb) {
    "use strict";

    this.find({"price": {$elemMatch: {"value": {$gt: 0}}}}, {}, {sort: {"price.value":-1}})
      .exec(cb);
  },

  /**
   *
   * @param {Function} cb
   */
  allFree: function(cb) {
    "use strict";

    this.find({"price": {$elemMatch: {"value": {$eq: 0}}}})
      .exec(cb);
  }
};

mongoose.model('Tariff', TariffSchema);
