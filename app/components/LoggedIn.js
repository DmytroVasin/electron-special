import React, { Component } from 'react';

export default class LoggedIn extends Component {

  handleLogout = () => {
    this.props.logOut({
      token: null
    });
  }

  render() {
    const { token } = this.props.settings
    return (
      <div>
        <h2>You are logged in!</h2>
        <h2>
          Token is: {token}
        </h2>
        <button onClick={this.handleLogout}>Log Out</button>
      </div>
    );
  }
}
