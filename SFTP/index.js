const { APP_TYPES } = require('@ply-io/ply-sdk');
const middlewares = require('./middlewares');
const auth = require('./auth');
const actions = require('./actions');
const contextsMapping = require('./contexts_mapping');

const App = {
    type: APP_TYPES.INTEGRATION,
    auth,
    // Patching fetch calls
    beforeMiddlewares: middlewares.beforeMiddlewares,
    // Patching fetch responses. WIP. NOT READY YET!
    afterMiddlewares: middlewares.afterMiddlewares,
    triggers: {},
    actions,
    contextsMapping,
};

module.exports = App;
