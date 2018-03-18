import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Database from '../helpers/db.js';

export default class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  state = {
    username: ''
  };

  handleLogin = () => {
    this.props.onLogin({
      username: this.state.username,
      loggedIn: true
    });
  }

  handleChange = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  handleClick = () => {
    Database.clear();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} >COLOR RED!!!!</button>
        <h2>Login</h2>
        <input onChange={this.handleChange} type="text" value={this.state.username} />
        <button onClick={this.handleLogin}>Log In</button>
      </div>
    );
  }
}
