import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import types from '../constants/actionTypes'
import Init from '../components/Init'
import { fetchToken } from '../actions/user'

const mapStateToProps = (state) => {
  return {
    settings: state.settings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchToken: () => {
      dispatch(fetchToken())
    },
    redirectToHome: () => {
      dispatch(push('/loggedin'));
    },
    redirectToSignIn: () => {
      dispatch(push('/signin'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Init)
