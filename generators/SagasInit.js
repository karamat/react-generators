/**
 * Redux Init Generator
 */

'use strict';
const { makeSubFolderPath, getTemplateFile } = require('../utils');

const sagaPath = makeSubFolderPath('default', 'sagasPath');
const apiPath = makeSubFolderPath('default', 'apiPath');
const getTemplate = (template) => getTemplateFile('SagasInit', template);

module.exports = {
  description: 'Initialize redux in the project',
  prompts: [],
  actions: (data) => {
    const actions = [{
      type: 'add',
      path: `${sagaPath}/index.js`,
      templateFile: getTemplate('index.js.hbs'),
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${apiPath}/api.js`,
      templateFile: getTemplate('api.js.hbs'),
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${apiPath}/FixtureApi.js`,
      templateFile: getTemplate('FixtureApi.js.hbs'),
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${apiPath}/DebugConfig.js`,
      templateFile: getTemplate('DebugConfig.js.hbs'),
      abortOnFail: true,
    }]
    return actions
  },
}
