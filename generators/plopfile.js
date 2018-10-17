import componentGenerator from './Component.js';
import containerGenerator from './Container.js';
import reduxInitGenerator from './ReduxInit.js';
import reduxEntityGenerator from './ReduxEntity.js';
import reduxActionGenerator from './ReduxAction.js';
import sagasInitGenerator from './SagasInit.js';
import sagaEntityGenerator from './SagaEntity.js';
import sagaActionGenerator from './SagaAction.js';
import stateToPropsGenerator from './StateToProps.js';

module.exports = (plop) => {
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('container', containerGenerator)
  plop.setGenerator('redux init', reduxInitGenerator)
  plop.setGenerator('redux entity', reduxEntityGenerator)
  plop.setGenerator('redux action', reduxActionGenerator)
  plop.setGenerator('sagas init', sagasInitGenerator)
  plop.setGenerator('saga entity', sagaEntityGenerator)
  plop.setGenerator('saga action', sagaActionGenerator)
  plop.setGenerator('state to props', stateToPropsGenerator)
}
