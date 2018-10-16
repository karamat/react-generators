/**
 * Redux Init Generator
 */

'use strict';

const { makeSubFolderPath, getTemplateFile } = require('../utils');

const reduxPath = makeSubFolderPath('reduxPath')
const apiPath = makeSubFolderPath('apiPath')
const getTemplate = (template) => getTemplateFile('ReduxInit', template);
// const getApiTemplate = (template) => getTemplateFile('ReduxInit', template);

module.exports = {
  description: 'Initialize redux in the project',
  prompts: [],
  actions: (data) => {
    const actions = [{
      type: 'add',
      path: `${reduxPath}/index.js`,
      templateFile: getTemplate('index.js.hbs'),
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${reduxPath}/CreateStore.js`,
      templateFile: getTemplate('CreateStore.js.hbs'),
      abortOnFail: true,
    // }, {
    //   type: 'add',
    //   path: `${apiPath}/RehydrationServices.js`,
    //   templateFile: getTemplate('RehydrationServices.js.hbs'),
    //   abortOnFail: true,
    }, {
      type: 'add',
      path: `${reduxPath}/ActionTypes.js`,
      templateFile: getTemplate('ActionTypes.js.hbs'),
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${reduxPath}/Actions.js`,
      templateFile: getTemplate('Actions.js.hbs'),
      abortOnFail: true,
    }]
    return actions
  },
}
