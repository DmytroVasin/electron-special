import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Database from '../helpers/db.js';

export default class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  state = {
    token: ''
  };

  handleLogin = () => {
    this.props.onLogin({
      token: this.state.token
    });
  }

  handleChange = (e) => {
    this.setState({ token: e.target.value });
  }

  handleClick = () => {
    Database.clear();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} >COLOR RED!!!!</button>
        <h2>Login</h2>
        <input onChange={this.handleChange} type="text" value={this.state.token} />
        <button onClick={this.handleLogin}>Log In</button>
      </div>
    );
  }
}
