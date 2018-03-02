const path = require('path');
const projectPath = '/' //Absolute path to your project's Root

const componentsDir = path.join(projectPath, 'App/components')
// const containersDir = path.join(projectPath, 'app/containers')
const containersDir = path.join(projectPath, 'App/Containers/SignupScreens')

// const reduxDir = path.join(projectPath, 'app/redux')
const reduxDir = path.join(projectPath, 'App/Redux')
const sagasDir = path.join(projectPath, 'App/Sagas')
const apiDir = path.join(projectPath, 'App/services')

module.exports = {
  componentsDir,
  containersDir,
  reduxDir,
  sagasDir,
  apiDir,
}
