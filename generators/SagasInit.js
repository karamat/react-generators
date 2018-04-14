/**
 * Redux Init Generator
 */

'use strict';

const { sagasDir, apiDir } = require('../../')


module.exports = {
  description: 'Initialize redux in the project',
  prompts: [],
  actions: (data) => {
    const actions = [{
      type: 'add',
      path: `${sagasDir}/index.js`,
      templateFile: './SagasInit/index.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${apiDir}/api.js`,
      templateFile: './SagasInit/api.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${apiDir}/FixtureApi.js`,
      templateFile: './SagasInit/FixtureApi.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${apiDir}/DebugConfig.js`,
      templateFile: './SagasInit/DebugConfig.js.hbs',
      abortOnFail: true,
    }]
    return actions
  },
}
