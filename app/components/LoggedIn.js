import React, { Component } from 'react';
import Calculator from './calculator'

class LoggedIn extends Component {

  handleLogout = () => {
    this.props.logOut({ token: null });
  }

  render() {
    const { token } = this.props.settings

    return (
      <div>
        <h2>You are logged in!</h2>
        Token is: {token}
        <button onClick={this.handleLogout}>Log Out</button>

        <div className="container">
          <p>
            This component works exactly like the calculator you know. Click any number to start calculating!
          </p>

          <Calculator displayValue='0' />
        </div>

      </div>
    );
  }
}

export default LoggedIn
