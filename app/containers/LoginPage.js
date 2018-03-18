import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// import { bindActionCreators } from 'redux';
import types from '../constants/actionTypes'
import Login from '../components/Login';
import { setToken } from '../actions/user'
// import userActions from '../actions/user';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (payload) => {
      dispatch(setToken(payload))
      dispatch(push('/loggedin'))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
