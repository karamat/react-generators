const path = require('path');
const projects = require('./projects');

const config = {
  templates: path.join(__dirname, '../templates/default/'),
  projects,
}

module.exports = config;
