/**
 * Saga Action Generator
 */

'use strict';
const { makeSubFolderPath, getTemplateFile } = require('../utils');

const sagasPath = makeSubFolderPath('sagasPath');
const apiPath = makeSubFolderPath('apiPath');
const getTemplate = (template) => getTemplateFile('SagaAction', template);

module.exports = {
  description: 'Add a saga action',
  prompts: [{
    type: 'input',
    name: 'sagaFileName',
    message: 'Where you want to add saga?',
    default: 'AuthSagas',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true
      }
      return 'The file name is required'
    },
  }, {
    type: 'input',
    name: 'sagaName',
    message: 'What should it be called?',
    default: 'makeFetchJobsRequest',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true
      }
      return 'The saga name is required'
    },
  }, {
    type: 'input',
    name: 'reduxActionName',
    message: 'Which redux action is associated with it?',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true
      }
      return 'The redux action name is required'
    },
  }, {
    type: 'confirm',
    name: 'isPromisified',
    message: 'Do want to add resolve, reject in action?',
    default: 'Y',
  }],
  actions: (data) => {
    const actions = [{
      type: 'modify',
      path: `${sagasPath}/{{sagaFileName}}.js`,
      pattern: /(\/\/\sADD_SAGA_ACTION)/g,
      templateFile: getTemplate('sagaAction.hbs'),
    }, {
      type: 'modify',
      path: `${sagasPath}/{{sagaFileName}}.js`,
      pattern: /(\s*\/\/\sEXPORT_SAGA_ACTION)/g,
      templateFile: getTemplate('exportAction.hbs'),
    }, {
      type: 'modify',
      path: `${sagasPath}/index.js`,
      pattern: /(\s*\/\/\sREGISTRER_SAGA)/g,
      templateFile: getTemplate('registerSaga.hbs'),
    }, {
      type: 'modify',
      path: `${apiPath}/Api.js`,
      pattern: /(\s*\/\/\sADD_API_HANDLER)/g,
      templateFile: getTemplate('apiHandler.hbs'),
    }, {
      type: 'modify',
      path: `${apiPath}/Api.js`,
      pattern: /(\s*\/\/\sEXPORT_API_HANDLER)/g,
      templateFile: getTemplate('exportApiHandler.hbs'),
    }]
    return actions
  },
}
