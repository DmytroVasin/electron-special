import types from '../constants/actionTypes'

const initialState = { token: null, fetched: false }

export default function settings(state = initialState, action = {}) {
  const { type } = action

  switch (type) {
    case types.FETCH_SETTINGS:
      return { ...state, token: action.payload.token, fetched: true }
    case types.SET_TOKEN:
      return { ...state, token: action.payload }
    default:
      return state
  }
}
