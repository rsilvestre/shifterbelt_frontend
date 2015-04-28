/**
 * Expose
 */

exports.variants = {
  article: {
    resize: {
      detail: 'x440'
    },
    crop: {},
    resizeAndCrop: {
      mini: { resize: '63504@', crop: '252x210' }
    }
  },

  gallery: {
    crop: {
      thumb: '100x100'
    }
  }
};

exports.storages = {
  local: {
    provider: 'local',
    path: '/tmp',
    mode: '0777'
  },
  amazon: {
    provider: 'amazon',
    keyId: process.env.IMAGER_S3_KEYID,
    key: process.env.IMAGER_S3_KEY,
    bucket: process.env.IMAGER_S3_BUCKET,
    region: process.env.IMAGER_S3_REGION
  }
};

exports.debug = true;
