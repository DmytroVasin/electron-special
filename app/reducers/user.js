import types from '../constants/actionTypes'

const initialState = { user: null, loggedIn: false }

export default function user(state = initialState, action = {}) {
  const { type } = action

  switch (type) {
    case types.SET_USER:
      return { ...state, user: action.payload.username, loggedIn: action.payload.loggedIn }
    default:
      return state
  }
}
