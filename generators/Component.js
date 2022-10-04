/**
 * Component Generator
 */

'use strict';

import { makeSubFolderPath, getTemplateFile } from '../utils';

const componentsPath = makeSubFolderPath('componentsPath')
const getTemplate = (template) => getTemplateFile('Component', template);

export default {
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
      path: `${componentsPath}/{{properCase name}}/index.tsx`,
      templateFile: getTemplate('index.tsx.hbs'),
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${componentsPath}/{{properCase name}}/{{properCase name}}.module.scss`,
      templateFile: getTemplate('styles.scss.hbs'),
      abortOnFail: true,
    }]
    return actions
  },
}
