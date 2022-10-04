import path from 'path';
import projects from './projects';

export const currentProject = 'FoodGorilla';

const templates = path.join(__dirname, `../templates/${currentProject}/`);
export { templates, projects };
