const plySDK = require('@ply-io/ply-sdk');
const app = require('./index');

exports.handler = plySDK.getAppHandler(app);
