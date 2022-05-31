const { APP_TYPES } = require('@ply-io/ply-sdk');
const middlewares = require('./middlewares'); // TODO
const auth = require('./auth');
const hosts = require('./hosts');
const actions = require('./actions');

// const management = require("./management"); // TODO
// const contextsMapping = require('./contexts_mapping'); // TODO
// const searchCreateMapping = require("./actions/searchCreateMapping"); // TODO

const App = {
  type: APP_TYPES.INTEGRATION,
  auth,
  //   management,
  // Patching fetch calls
  beforeMiddlewares: middlewares.beforeMiddlewares,
  // Patching fetch responses. WIP. NOT READY YET!
  //   afterMiddlewares: middlewares.afterMiddlewares,
  triggers: {},
  actions,
  // contextsMapping,
  hosts,
  // searchCreateMapping, // Who dis?
};

module.exports = App;
