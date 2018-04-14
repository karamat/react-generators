/**
 * Saga Action Generator
 */

'use strict';
const fs = require('fs');
const path = require('path');
const { sagasDir, apiDir } = require('../../')

function trimTemplateFile(template) {
  // Loads the template file and trims the whitespace and then returns the content as a string.
  return fs.readFileSync(path.join(__dirname, `./${template}`), 'utf8').replace(/\s*$/, '');
}

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
      path: `${sagasDir}/{{sagaFileName}}.js`,
      pattern: /(\/\/\sADD_SAGA_ACTION)/g,
      template: trimTemplateFile('sagaAction.hbs'),
    }, {
      type: 'modify',
      path: `${sagasDir}/{{sagaFileName}}.js`,
      pattern: /(\s*\/\/\sEXPORT_SAGA_ACTION)/g,
      template: trimTemplateFile('exportAction.hbs'),
    }, {
      type: 'modify',
      path: `${sagasDir}/index.js`,
      pattern: /(\s*\/\/\sREGISTRER_SAGA)/g,
      template: trimTemplateFile('registerSaga.hbs'),
    }, {
      type: 'modify',
      path: `${apiDir}/Api.js`,
      pattern: /(\s*\/\/\sADD_API_HANDLER)/g,
      template: trimTemplateFile('apiHandler.hbs'),
    }, {
      type: 'modify',
      path: `${apiDir}/Api.js`,
      pattern: /(\s*\/\/\sEXPORT_API_HANDLER)/g,
      template: trimTemplateFile('exportApiHandler.hbs'),
    }]
    return actions
  },
}
