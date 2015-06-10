/**
 * Module dependencies.
 */

'use strict';

var mongoose = require('mongoose');
var utils = require('../../lib/utils');
var countries = require('../../utils/countries.json');

var Schema = mongoose.Schema;

var countryValidator = function countryValidator(countryCode) {
  'use strict';

  return ~utils.indexof(countries, { code: countryCode });
};

var PlanSchema = new Schema({
  tariffPlan: { type: Schema.ObjectId, ref: 'Tariff', required: true },
  firstname: { type: String, required: 'The firstname should be filled' },
  lastname: { type: String, required: 'The lastname should be filled' },
  address: {
    address1: { type: String, required: 'An address should be given' },
    address2: { type: String },
    country: { type: String, required: 'A country should be selected', validate: countryValidator },
    zipcode: { type: String, required: 'A zip code should be given' },
    city: { type: String, required: 'The city should be filled' },
    phonenumber: { type: String, required: 'The phone number should be filled' }
  },
  createdAt: { type: Date, 'default': Date.now }

});

/**
 * Virtals
 */
PlanSchema.virtual('address1').set(function (value) {
  this.address.address1 = value;
}).get(function () {
  'use strict';
  return this.address.address1;
});

PlanSchema.virtual('address2').set(function (value) {
  this.address.address2 = value;
}).get(function () {
  'use strict';
  return this.address.address2;
});

PlanSchema.virtual('country').set(function (value) {
  this.address.country = value;
}).get(function () {
  'use strict';
  return this.address.country;
});

PlanSchema.virtual('zipcode').set(function (value) {
  this.address.zipcode = value;
}).get(function () {
  'use strict';
  return this.address.zipcode;
});

PlanSchema.virtual('city').set(function (value) {
  this.address.city = value;
}).get(function () {
  'use strict';
  return this.address.city;
});

PlanSchema.virtual('phonenumber').set(function (value) {
  this.address.phonenumber = value;
}).get(function () {
  'use strict';
  return this.address.phonenumber;
});

mongoose.model('Plan', PlanSchema);
//# sourceMappingURL=plan.js.map