/**
 * Component Generator
 */

'use strict';

import { makeSubFolderPath, getTemplateFile } from '../utils';

const containersPath = makeSubFolderPath('containersPath')
const getTemplate = (template) => getTemplateFile('Container', template);

export default {
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
      path: `${containersPath}/{{properCase name}}/index.js`,
      templateFile: getTemplate('es6.js.hbs'),
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${containersPath}/{{properCase name}}/styles.js`,
      templateFile: getTemplate('styles.js.hbs'),
      abortOnFail: true,
    }]
    return actions
  },
}
