const path = require('path');
const projectPath = './'

const componentsDir = path.join(__dirname, projectPath, 'app/components')
// const containersDir = path.join(__dirname, projectPath, 'app/containers')
const containersDir = path.join(__dirname, projectPath, 'App/Containers/SignupScreens')

// const reduxDir = path.join(__dirname, projectPath, 'app/redux')
const reduxDir = path.join(__dirname, projectPath, 'App/Redux')
const sagasDir = path.join(__dirname, projectPath, 'App/Sagas')
const apiDir = path.join(__dirname, projectPath, 'app/services')

module.exports = {
  componentsDir,
  containersDir,
  reduxDir,
  sagasDir,
  apiDir,
}
