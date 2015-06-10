/**
 * Created by michaelsilvestre on 1/03/15.
 */

'use strict';

var crypto = require('crypto');

function genUuid(callback) {
    if (typeof callback !== 'function') {
        return uuidFromBytes(crypto.randomBytes(16));
    }

    crypto.randomBytes(16, function (err, rnd) {
        if (err) return callback(err);
        callback(null, uuidFromBytes(rnd));
    });
}

function uuidFromBytes(rnd) {
    rnd[6] = rnd[6] & 15 | 64;
    rnd[8] = rnd[8] & 63 | 128;
    rnd = rnd.toString('hex').match(/(.{8})(.{4})(.{4})(.{4})(.{12})/);
    rnd.shift();
    return rnd.join('-');
}

module.exports = genUuid;
//# sourceMappingURL=genUuid.js.map