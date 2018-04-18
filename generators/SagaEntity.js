/**
 * Saga Entity Generator
 */

'use strict';
const fs = require('fs');
const path = require('path');
const { sagasDir } = require('../');
const { trimFile } = require('../utils');

const templateDir = path.join(__dirname, '../templates/default/SagaEntity/');
const trimFileFunc = (file) => trimFile(templateDir, file);

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
      templateFile: '../templates/default/SagaEntity/sagaEntity.hbs',
      abortOnFail: true,
    }, {
      type: 'modify',
      path: `${sagasDir}/index.js`,
      pattern: /(\/\/\sIMPORT_SAGAS)/g,
      template: trimFileFunc('importSagas.hbs'),
    }, {
      type: 'modify',
      path: `${sagasDir}/index.js`,
      pattern: /(\/\/\sSPREAD_SAGAS)/g,
      template: trimFileFunc('spreadSagas.hbs'),
    }]
    return actions
  },
}
