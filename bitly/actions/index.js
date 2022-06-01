const createBitlink = require('./create_bitlink');
const actions = {
    [createBitlink.key]: createBitlink,
};

module.exports = actions;
