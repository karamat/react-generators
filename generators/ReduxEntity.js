/**
 * Redux Entity Generator
 */

'use strict';

import { makeSubFolderPath, getTemplateFile } from '../utils';

const reduxPath = makeSubFolderPath('reduxPath')
const getTemplate = (template) => getTemplateFile('ReduxEntity', template);

export default {
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
      path: `${reduxPath}/{{properCase name}}Redux.js`,
      templateFile: getTemplate('reduxEntity.hbs'),
      abortOnFail: true,
    }, {
      type: 'modify',
      path: `${reduxPath}/index.js`,
      pattern: /(,\n\s+\/\/.*ADD_REDUX_REDUCER\n}\))/g,
      templateFile: getTemplate('reducer.hbs'),
    }, {
      type: 'modify',
      path: `${reduxPath}/Actions.js`,
      pattern: /(\/\/\sADD_IMPORT)/g,
      templateFile: getTemplate('actionImport.hbs'),
    }, {
      type: 'modify',
      path: `${reduxPath}/Actions.js`,
      pattern: /(\/\/\sADD_ACTIONS)/g,
      templateFile: getTemplate('addActions.hbs'),
    }, {
      type: 'modify',
      path: `${reduxPath}/ActionTypes.js`,
      pattern: /(\/\/\sADD_IMPORT)/g,
      templateFile: getTemplate('actionTypeImport.hbs'),
    }, {
      type: 'modify',
      path: `${reduxPath}/ActionTypes.js`,
      pattern: /(\/\/\sADD_ACTION_TYPE)/g,
      templateFile: getTemplate('addActionTypes.hbs'),
    }]
    return actions
  },
}
