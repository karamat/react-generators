/**
 * Redux Init Generator
 */

'use strict';

const { reduxDir, apiDir } = require('../')


module.exports = {
  description: 'Initialize redux in the project',
  prompts: [],
  actions: (data) => {
    const actions = [{
      type: 'add',
      path: `${reduxDir}/index.js`,
      templateFile: '../templates/default//ReduxInit/index.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${reduxDir}/CreateStore.js`,
      templateFile: '../templates/default//ReduxInit/CreateStore.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${apiDir}/RehydrationServices.js`,
      templateFile: '../templates/default//ReduxInit/RehydrationServices.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${reduxDir}/ActionTypes.js`,
      templateFile: '../templates/default//ReduxInit/ActionTypes.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${reduxDir}/Actions.js`,
      templateFile: '../templates/default//ReduxInit/Actions.js.hbs',
      abortOnFail: true,
    }]
    return actions
  },
}
