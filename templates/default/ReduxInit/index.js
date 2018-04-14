/**
 * Redux Init Generator
 */

'use strict';

const { reduxDir, apiDir } = require('../../')


module.exports = {
  description: 'Initialize redux in the project',
  prompts: [],
  actions: (data) => {
    const actions = [{
      type: 'add',
      path: `${reduxDir}/index.js`,
      templateFile: './ReduxInit/index.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${reduxDir}/CreateStore.js`,
      templateFile: './ReduxInit/CreateStore.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${apiDir}/RehydrationServices.js`,
      templateFile: './ReduxInit/RehydrationServices.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${reduxDir}/ActionTypes.js`,
      templateFile: './ReduxInit/ActionTypes.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${reduxDir}/Actions.js`,
      templateFile: './ReduxInit/Actions.js.hbs',
      abortOnFail: true,
    }]
    return actions
  },
}
