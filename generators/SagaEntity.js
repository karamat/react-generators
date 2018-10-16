/**
 * Saga Entity Generator
 */

'use strict';
const { makeSubFolderPath, getTemplateFile } = require('../utils');

const sagasPath = makeSubFolderPath('sagasPath');
const getTemplate = (template) => getTemplateFile('SagasInit', template);

module.exports = {
  description: 'Add a saga entity',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Auth',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true
      }
      return 'The name is required'
    },
  }],
  actions: (data) => {
    const actions = [{
      type: 'add',
      path: `${sagasPath}/{{properCase name}}Sagas.js`,
      templateFile: getTemplate('sagaEntity.hbs'),
      abortOnFail: true,
    }, {
      type: 'modify',
      path: `${sagasPath}/index.js`,
      pattern: /(\/\/\sIMPORT_SAGAS)/g,
      template: getTemplate('importSagas.hbs'),
    }, {
      type: 'modify',
      path: `${sagasPath}/index.js`,
      pattern: /(\/\/\sSPREAD_SAGAS)/g,
      template: getTemplate('spreadSagas.hbs'),
    }]
    return actions
  },
}
