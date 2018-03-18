import React, { Component } from 'react';
import Database from '../helpers/db.js';

class Init extends Component {
  constructor(props) {
    super(props)

    this.props.fetchToken()
  }

  componentWillReceiveProps(nextProps) {

    if (!nextProps.settings.fetched) { return false }

    if (nextProps.settings.token) {
      this.props.redirectToHome()
    } else {
      this.props.redirectToSignIn()
    }
  }

  render() {
    return (
      <div>
        Loading...
      </div>
    );
  }
}


export default Init
