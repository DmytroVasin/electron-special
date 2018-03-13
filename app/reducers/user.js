// import { handleActions } from 'redux-actions';
// import actions from '../actions/user';

// export default handleActions({
//   [actions.login]: (state, action) => {
//     return { ...state, ...action.payload };
//   }
// }, {});



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
