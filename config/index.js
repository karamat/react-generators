import path from 'path';
import projects from './projects';

const templates = path.join(__dirname, '../templates/default/');
export { templates, projects };
export const currentProject = 'default';
