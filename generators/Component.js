/**
 * Component Generator
 */

'use strict';

const { componentsDir } = require('../')

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
      path: `${componentsDir}/{{properCase name}}/index.js`,
      templateFile: '../templates/default/Component/es6.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${componentsDir}/{{properCase name}}/styles.js`,
      templateFile: '../templates/default/Component/styles.js.hbs',
      abortOnFail: true,
    }]
    return actions
  },
}
