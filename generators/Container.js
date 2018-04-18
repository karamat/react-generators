/**
 * Component Generator
 */

'use strict';

const { containersDir } = require('../')

module.exports = {
  description: 'Add a container',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'NewContainer',
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
      path: `${containersDir}/{{properCase name}}/index.js`,
      templateFile: '../templates/default/Container/es6.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${containersDir}/{{properCase name}}/styles.js`,
      templateFile: '../templates/default/Container/styles.js.hbs',
      abortOnFail: true,
    }]
    return actions
  },
}
