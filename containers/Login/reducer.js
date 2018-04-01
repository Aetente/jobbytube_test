/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SIGN_IN
} from './constants';

const initialState = fromJS({});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SIGN_IN:
      state.set('password',action.pass)
      return state.set('email',action.email)
    default:
      return state;
  }
}

export default loginReducer;
