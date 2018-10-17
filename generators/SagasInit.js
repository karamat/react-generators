/**
 * Redux Init Generator
 */

'use strict';
import { makeSubFolderPath, getTemplateFile } from '../utils';

const sagaPath = makeSubFolderPath('sagasPath');
const apiPath = makeSubFolderPath('apiPath');
const getTemplate = (template) => getTemplateFile('SagasInit', template);

export default {
  description: 'Initialize redux in the project',
  prompts: [],
  actions: (data) => {
    const actions = [{
      type: 'add',
      path: `${sagaPath}/index.js`,
      templateFile: getTemplate('index.js.hbs'),
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${apiPath}/api.js`,
      templateFile: getTemplate('api.js.hbs'),
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${apiPath}/FixtureApi.js`,
      templateFile: getTemplate('FixtureApi.js.hbs'),
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${apiPath}/DebugConfig.js`,
      templateFile: getTemplate('DebugConfig.js.hbs'),
      abortOnFail: true,
    }]
    return actions
  },
}
