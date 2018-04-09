const path = require('path');
const projectPath = '/Users/mr/Projects/3tAndAI/foodrx/client' //Absolute path to your project's Root

const componentsDir = path.join(projectPath, 'app/components')
//const containersDir = path.join(projectPath, 'app/containers')
const containersDir = path.join(projectPath, 'app/containers/')

// const reduxDir = path.join(projectPath, 'app/redux')
const reduxDir = path.join(projectPath, 'app/reduxApp')
const sagasDir = path.join(projectPath, 'app/sagas')
const apiDir = path.join(projectPath, 'app/services')

module.exports = {
  componentsDir,
  containersDir,
  reduxDir,
  sagasDir,
  apiDir,
}
