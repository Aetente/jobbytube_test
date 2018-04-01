/*
 *
 * Login actions
 *
 */

import {
  DEFAULT_ACTION,
  SIGN_IN
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function signIn(email,pass){
  return {
    type: SIGN_IN,
    email: email,
    pass: pass
  };
}
