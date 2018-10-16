/**
 * Component Generator
 */

'use strict';

const { makeSubFolderPath, getTemplateFile } = require('../utils');

const componentsPath = makeSubFolderPath('componentsPath')
const getTemplate = (template) => getTemplateFile('Component', template);

module.exports = {
  description: 'Add a component',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'NewComponent',
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
      path: `${componentsPath}/{{properCase name}}/index.js`,
      templateFile: getTemplate('es6.js.hbs'),
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${componentsPath}/{{properCase name}}/styles.js`,
      templateFile: getTemplate('styles.js.hbs'),
      abortOnFail: true,
    }]
    return actions
  },
}
