import Database from '../helpers/db.js';
import { push } from 'react-router-redux';

export function login(text) {
  return { type: 'USER_LOGIN' }
}
export function fetchToken() {
  return function(dispatch) {

    const settings = Database.getIn('settings', {})

    // Object.keys(settings).length === 0

    dispatch({
      type: 'FETCH_SETTINGS',
      payload: settings,
    })
  }
}

export function setToken(payload) {
  return function(dispatch) {
    const settings = Database.setIn('settings.token', payload.token)

    dispatch({
      type: 'SET_TOKEN',
      payload: payload.token,
    })

  }
}
