import types from '../constants/actionTypes'

const initialState = { status: 'idle', data: {} }

export default function updater(state = initialState, action = {}) {
  const { type } = action

  switch (type) {
    case types.SET_UPDATE_STATUS: {
      const { data, status } = action.payload
      return { ...state, status, data }
    }
    default:
      return state
  }
}
