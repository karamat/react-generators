/**
 * State To Props Generator
 */

'use strict';
const { makeSubFolderPath, getTemplateFile, getReduxStates,
  getContainers } = require('../utils');

const containerPath = makeSubFolderPath('containersPath');
const apiPath = makeSubFolderPath('apiPath');
const getTemplate = (template) => getTemplateFile('StateToProps', template);

export default {
  description: 'Add redux state to container props',
  prompts: [{
    type: 'list',
    name: 'statePath',
    message: 'Select a state from redux store',
    choices: getReduxStates(),
    default: 0,
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true
      }
      return 'The state path is required'
    },
  }, {
    type: 'list',
    name: 'containerPath',
    message: 'Select a container you want to add this prop to',
    choices: getContainers(),
    default: 0,
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true
      }
      return 'The container name is required'
    },
  }, {
    type: 'input',
    name: 'propKey',
    message: 'what prop you want to add for this state',
    default: 'state',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true
      }
      return 'The container name is required'
    },
  }, {
    type: 'list',
    name: 'propType',
    message: 'Select the type of prop',
    choices: ['string','object','array','bool'],
    default: 0,
  }],
  actions: (data) => {
    console.log('*******************************\n');
    console.log('Possible usages of the prop\n\n');
    console.log(`this.props.${data.propKey}`);
    console.log(`const { ${data.propKey} } = this.props`);
    if (data.propType === 'bool') {
      console.log(`{${data.propKey} && <Test />}`);
      console.log(`{${data.propKey} ? <Test /> : <Test />}`);
      console.log(`if ({${data.propKey}) {\n\n} else {\n\n}`);
    }

    if (data.propType === 'array') {
      console.log(`${data.propKey}.length`);
      console.log(`map(this.props.${data.propKey}, item => item)`);
      console.log(`map(this.props.${data.propKey}, item =>\n  item.merge({ keyEvaluator: item.id }))`);
      console.log(`{map(${data.propKey}, (item) => (\n  <View>{item}</View>\n))}`);
    }
    console.log('\n*******************************');

    let actions = []
    const containerFile = `${containerPath}/${data.containerPath}/index.js`

    const mapStateToProps = customModify(data, {
      path: containerFile,
      pattern: new RegExp(regex.mapStateToProps, 'g'),
      templateFile: getTemplate('mapStateToProps.hbs'),
      dataMapping: {
        retainPattern: 'statePattern',
      },
      escape: ['=']
    });

    const propTypes = customModify(data, {
      path: containerFile,
      pattern: new RegExp(regex.propTypes, 'g'),
      templateFile: getTemplate('propTypes.hbs'),
      dataMapping: {
        retainPattern: 'propTypePattern',
        state: data.actionName,
        propType: data.propType,
        propTypeRequired: true,
      },
      escape: ['=']
    });

    actions = actions.concat(mapStateToProps);
    actions = actions.concat(propTypes);

    return actions
  },
}
