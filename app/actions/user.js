import Database from '../helpers/db.js';

export function login(text) {
  return { type: 'USER_LOGIN' }
}
export function fetchToken() {
  return function(dispatch) {

    const settings = Database.getIn('settings', {})

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
