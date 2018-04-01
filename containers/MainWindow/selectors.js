import { createSelector } from 'reselect';

/**
 * Direct selector to the mainWindow state domain
 */
const selectMainWindowDomain = (state) => state.get('mainWindow');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MainWindow
 */

const makeSelectMainWindow = () => createSelector(
  selectMainWindowDomain,
  (substate) => substate.toJS()
);

export default makeSelectMainWindow;
export {
  selectMainWindowDomain,
};
