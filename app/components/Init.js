import React, { Component, StrictMode } from 'react';
// import Database from '../helpers/db.js';

import Calculator from './Calculator'
import AppUpdater from './AppUpdater'
import AppHeader from './AppHeader'

class Init extends Component {
  // handleClick = () => {
  //   Database.clear();
  // }

  render() {
    return (
      <StrictMode>

        <AppHeader />
        <AppUpdater />
        <Calculator displayValue='0' />

      </StrictMode>
    );
  }
}

export default Init
