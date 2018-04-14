/**
 * Saga Entity Generator
 */

'use strict';
const fs = require('fs');
const path = require('path');
const { sagasDir } = require('../../')

function trimTemplateFile(template) {
  // Loads the template file and trims the whitespace and then returns the content as a string.
  return fs.readFileSync(path.join(__dirname, `./${template}`), 'utf8').replace(/\s*$/, '');
}

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
      path: `${sagasDir}/{{properCase name}}Sagas.js`,
      templateFile: './SagaEntity/sagaEntity.hbs',
      abortOnFail: true,
    }, {
      type: 'modify',
      path: `${sagasDir}/index.js`,
      pattern: /(\/\/\sIMPORT_SAGAS)/g,
      template: trimTemplateFile('importSagas.hbs'),
    }, {
      type: 'modify',
      path: `${sagasDir}/index.js`,
      pattern: /(\/\/\sSPREAD_SAGAS)/g,
      template: trimTemplateFile('spreadSagas.hbs'),
    }]
    return actions
  },
}
