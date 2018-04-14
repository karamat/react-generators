'use strict';
const fs = require('fs');
const path = require('path');
const { each, map, filter } = require('lodash');
const { reduxDir, containersDir } = require('../../')

const regex = {
  import: 'import\\s.*\\sfrom\\s.*\\n\\n',
  mapStateToProps: 'const\\smapStateToProps\\s=\\screateStructuredSelector\\(\\{',
  propTypes: 'static\\spropTypes\\s?=\\s?\\{',
  mapActionToProps: 'const\\smapDispatchToProps\\s?=\\s?\\(dispatch\\)\\s?=>\\s?\\(\\{',
}

const escapeRegex = {
  '=': /&#x3D;/g,
  '\'': /&#x27;/g,
  '>': /&gt;/g,
}

function getFileContent(dir, file) {
  return fs.readFileSync(path.join(dir, `${file}`), 'utf8');
}

function trim(file) {
  return file.replace(/\n*\s*$/, '');
}

function trimFile(dir, file) {
  return trim(getFileContent(dir, file));
}

function customModify(data, args) {
  const fileContent = getFileContent('', args.path);
  const pattern = fileContent.match(args.pattern);

  if (pattern === null) {
    console.log('no match found.');
    return []
  }

  each(args.dataMapping, (value, key) => data[key] = value);
  data[args.dataMapping.retainPattern] = pattern['0'];

  const modify = {
    type: 'modify',
    path: args.path,
    pattern: args.pattern,
    template: args.template,
  }

  const escapeActions = map(args.escape, (esc) => ({
    type: 'modify',
    path: args.path,
    pattern: escapeRegex[esc],
    template: esc,
  }));

  return [modify].concat(escapeActions);
}

function getReduxEntities() {
  if (!fs.existsSync(reduxDir))
    return []
  const files = fs.readdirSync(reduxDir);
  let filtered = filter(files, (f) => f.match(/Redux.js/))
  return map(filtered, (f) => f.replace('.js', ''))
}

function getContainers() {
  if (!fs.existsSync(containersDir))
    return []
  const files = fs.readdirSync(containersDir);
  return map(files, (f) => f.replace('.js', ''))
}

function getReduxStates() {
  if (!fs.existsSync(reduxDir))
    return ['state']
  const reduxFileContent = getFileContent(reduxDir, 'index.js')
  const reducersBlockRegex = 'export\\sconst\\sreducers\\s=\\scombineReducers\\(\\{(\\n.*?)*\\}\\)'
  const reducerRegex = '.*:\\srequire\\(.*\\)\\.reducer,'
  const pattern = reduxFileContent.match(reducersBlockRegex);
  let reducers  = []
  if (pattern) {
    reducers = pattern[0].match(new RegExp(reducerRegex, 'g'))
  }
  const reducersArr = map(reducers, (r) => {
    let obj = {}
    obj.key = r.replace(/:.*/, '').trim()
    obj.file = r.replace(/.*\.\//, '').replace(/\'.*/g,'')
    return obj
  })
  let fileContent = null
  let initialStateBlock = null
  let states = null
  let initialState = null
  let finalStates = []
  const initialStateBlockRegex = 'export\\sconst\\sINITIAL_STATE\\s=\\sImmutable\\(\{(\\n.*?)*\\}\\)'
  each(reducersArr, (reducerObj) => {
    fileContent = getFileContent(reduxDir, reducerObj.file+'.js')
    initialStateBlock = fileContent.match(initialStateBlockRegex);
    if (initialStateBlock) {
      initialState = initialStateBlock[0].replace(/export\sconst\sINITIAL_STATE\s=\sImmutable/, 'Object.keys')
      states = eval(initialState)
      finalStates = finalStates.concat(map(states, s => `${reducerObj.key}.${s}`))
    }
  })
  return finalStates
}

module.exports = {
  regex,
  getFileContent,
  trim,
  trimFile,
  customModify,
  getReduxEntities,
  getContainers,
  getReduxStates
}
