
import { fromJS } from 'immutable';
import mainWindowReducer from '../reducer';

describe('mainWindowReducer', () => {
  it('returns the initial state', () => {
    expect(mainWindowReducer(undefined, {})).toEqual(fromJS({}));
  });
});
