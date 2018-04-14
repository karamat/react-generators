/**
 * Redux Entity Generator
 */

'use strict';
const fs = require('fs');
const path = require('path');
const { reduxDir } = require('../../')

function trimTemplateFile(template) {
  // Loads the template file and trims the whitespace and then returns the content as a string.
  return fs.readFileSync(path.join(__dirname, `./${template}`), 'utf8').replace(/\s*$/, '');
}

module.exports = {
  description: 'Add a redux entity',
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
      path: `${reduxDir}/{{properCase name}}Redux.js`,
      templateFile: './ReduxEntity/reduxEntity.hbs',
      abortOnFail: true,
    }, {
      type: 'modify',
      path: `${reduxDir}/index.js`,
      pattern: /(,\n\s+\/\/.*ADD_REDUX_REDUCER\n}\))/g,
      template: trimTemplateFile('reducer.hbs'),
    }, {
      type: 'modify',
      path: `${reduxDir}/Actions.js`,
      pattern: /(\/\/\sADD_IMPORT)/g,
      template: trimTemplateFile('actionImport.hbs'),
    }, {
      type: 'modify',
      path: `${reduxDir}/Actions.js`,
      pattern: /(\/\/\sADD_ACTIONS)/g,
      template: trimTemplateFile('addActions.hbs'),
    }, {
      type: 'modify',
      path: `${reduxDir}/ActionTypes.js`,
      pattern: /(\/\/\sADD_IMPORT)/g,
      template: trimTemplateFile('actionTypeImport.hbs'),
    }, {
      type: 'modify',
      path: `${reduxDir}/ActionTypes.js`,
      pattern: /(\/\/\sADD_ACTION_TYPE)/g,
      template: trimTemplateFile('addActionTypes.hbs'),
    }]
    return actions
  },
}
