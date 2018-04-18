/**
 * Redux Entity Generator
 */

'use strict';
const fs = require('fs');
const path = require('path');
const { reduxDir } = require('../');
const { trimFile } = require('../utils');

const templateDir = path.join(__dirname, '../templates/default/ReduxEntity/');
const trimFileFunc = (file) => trimFile(templateDir, file);

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
      templateFile: '../templates/default/ReduxEntity/reduxEntity.hbs',
      abortOnFail: true,
    }, {
      type: 'modify',
      path: `${reduxDir}/index.js`,
      pattern: /(,\n\s+\/\/.*ADD_REDUX_REDUCER\n}\))/g,
      template: trimFileFunc('reducer.hbs'),
    }, {
      type: 'modify',
      path: `${reduxDir}/Actions.js`,
      pattern: /(\/\/\sADD_IMPORT)/g,
      template: trimFileFunc('actionImport.hbs'),
    }, {
      type: 'modify',
      path: `${reduxDir}/Actions.js`,
      pattern: /(\/\/\sADD_ACTIONS)/g,
      template: trimFileFunc('addActions.hbs'),
    }, {
      type: 'modify',
      path: `${reduxDir}/ActionTypes.js`,
      pattern: /(\/\/\sADD_IMPORT)/g,
      template: trimFileFunc('actionTypeImport.hbs'),
    }, {
      type: 'modify',
      path: `${reduxDir}/ActionTypes.js`,
      pattern: /(\/\/\sADD_ACTION_TYPE)/g,
      template: trimFileFunc('addActionTypes.hbs'),
    }]
    return actions
  },
}
