/**
 * Redux Entity Generator
//  */
//
// 'use strict';
const fs = require('fs');
const path = require('path');
const { customModify, regex, trimFile, getReduxEntities,
  getContainers } = require('../Utils')
const { reduxDir, containersDir } = require('../../')

module.exports = {
  description: 'Add a redux action',
  prompts: [{
    type: 'input',
    name: 'actionName',
    message: 'What is the action name?',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true
      }
      return 'The action name is required'
    },
  }, {
    type: 'confirm',
    name: 'wantRequestActions',
    message: 'Do you want to create actions with postfix Request, Success, Failure?',
  }, {
    type: 'list',
    name: 'reduxFileName',
    message: 'Which redux file should it be added to?',
    choices: getReduxEntities(),
    default: 0,
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true
      }
      return 'The file name is required'
    },
  }, {
    type: 'list',
    name: 'containerFileName',
    message: 'Which container file should it be added to?',
    choices: getContainers(),
    default: 0,
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true
      }
      return 'The file name is required'
    },
  }],
  // }, {
  //   type: 'input',
  //   name: 'containerFileName',
  //   message: 'Which container file should it be added to?',
  // }],
  actions: (data) => {
    let actions = [{
      type: 'modify',
      path: `${reduxDir}/{{reduxFileName}}.js`,
      pattern: /(\s*\/\/\sadd action here)/g,
      template: trimFile(__dirname, 'addAction.hbs'),
    }, {
      type: 'modify',
      path: `${reduxDir}/{{reduxFileName}}.js`,
      pattern: /(\s*\/\/\sadd new reducer here)/g,
      template: trimFile(__dirname, 'addReducer.hbs'),
    }, {
      type: 'modify',
      path: `${reduxDir}/{{reduxFileName}}.js`,
      pattern: /(\s*\/\/\sadd reducer hook up here)/g,
      template: trimFile(__dirname, 'addReducerHook.hbs'),
    }]


    const actionTemplate = (data.wantRequestActions
                            ? 'promiseActionToProps.hbs'
                            : 'actionToProps.hbs')

    const containerFile = `${containersDir}/${data.containerFileName}/index.js`
    const mapActionToProps = customModify(data, {
      path: containerFile,
      pattern: new RegExp(regex.mapActionToProps, 'g'),
      template: trimFile(__dirname, actionTemplate),
      dataMapping: {
        retainPattern: 'actionPattern',
        actionName: data.actionName,
        actionArgs: 'payload',
      },
      escape: ['=', '>']
    });

    const propTypes = customModify(data, {
      path: containerFile,
      pattern: new RegExp(regex.propTypes, 'g'),
      template: trimFile(__dirname, './propTypes.hbs'),
      dataMapping: {
        retainPattern: 'propTypePattern',
        state: data.actionName,
        propType: 'func', // or bool or array or func
        propTypeRequired: true,
      },
      escape: ['=']
    });
    actions = actions.concat(mapActionToProps);
    actions = actions.concat(propTypes);

    return actions
  },
}
