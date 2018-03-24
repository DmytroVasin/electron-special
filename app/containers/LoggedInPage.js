import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoggedIn from '../components/LoggedIn';
import { setToken } from '../actions/user'

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => { // eslint-disable-line no-unused-vars
  return {
    logOut: (payload) => {
      dispatch(setToken(payload))
      dispatch(push('/'))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn);
