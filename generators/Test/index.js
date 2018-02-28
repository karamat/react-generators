/**
 * Generator
 */

'use strict';
const { flatten } = require('lodash');
const { customModify, regex, trimFile } = require('../Utils')

module.exports = {
  description: 'Add a saga entity',
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
    let actions = [];
    const addfile = {
      type: 'add',
      path: './Test/test.js',
      templateFile: './Test/template.hbs',
      abortOnFail: true,
    }

    const addImport = customModify(data, {
      path: './Test/test.js',
      pattern: new RegExp(regex.import, 'g'),
      template: trimFile('./Test/template2.hbs'),
      dataMapping: {
        retainPattern: 'importPattern',
        append: false,
      },
      escape: ['\'']
    });

    const mapStateToProps = customModify(data, {
      path: './Test/test.js',
      pattern: new RegExp(regex.mapStateToProps, 'g'),
      template: trimFile('./Test/template3.hbs'),
      dataMapping: {
        retainPattern: 'statePattern',
        statePath: 'auth.form.email',
        state: 'email',
      },
      escape: ['=']
    });

    const propTypes = customModify(data, {
      path: './Test/test.js',
      pattern: new RegExp(regex.propTypes, 'g'),
      template: trimFile('./Test/template4.hbs'),
      dataMapping: {
        retainPattern: 'propTypePattern',
        state: 'email',
        propType: 'string', // or bool or array or func
        required: false,
      },
      escape: ['=']
    });

    const mapActionToProps = customModify(data, {
      path: './Test/test.js',
      pattern: new RegExp(regex.mapActionToProps, 'g'),
      template: trimFile('./Test/template5.hbs'),
      dataMapping: {
        retainPattern: 'actionPattern',
        actionName: 'fetchJobsRequest',
        actionArgs: 'payload',
      },
      escape: ['=', '>']
    });

    const mapPromiseActionToProps = customModify(data, {
      path: './Test/test.js',
      pattern: new RegExp(regex.mapActionToProps, 'g'),
      template: trimFile('./Test/template6.hbs'),
      dataMapping: {
        retainPattern: 'promiseActionPattern',
        actionName: 'fetchJobsRequest',
        actionArgs: 'payload',
      },
      escape: ['=', '>']
    });

    actions = actions.concat(addImport);
    actions = actions.concat(mapStateToProps);
    actions = actions.concat(propTypes);
    actions = actions.concat(mapActionToProps);
    actions = actions.concat(mapPromiseActionToProps);

    return flatten(actions);
  },
}
