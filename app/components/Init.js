import React, { Component, Fragment, StrictMode } from 'react';
// import Database from '../helpers/db.js';
import { remote } from 'electron'
import { SMALL_WIDTH, SMALL_HEIGHT, BIG_WIDTH, BIG_HEIGHT } from '../constants/app'

import Calculator from './Calculator'
import AppUpdater from './AppUpdater'
import AppHeader from './AppHeader'

class Init extends Component {
  // handleClick = () => {
  //   Database.clear();
  // }

  constructor(props) {
    super(props)

    this.currentWindow = remote.getCurrentWindow()

    const { width } = this.currentWindow.getBounds()
    const calculatorMode = width === SMALL_WIDTH ? 'normal' : 'scientific'

    this.state = {
      mode: calculatorMode
    }
  }

  changeMode = () => {
    const { mode } = this.state

    if (mode === 'normal') {
      this.switchToScientific()
    } else {
      this.switchToNormal()
    }
  }

  switchToScientific = () => {
    this.currentWindow.setSize(BIG_WIDTH, BIG_HEIGHT)
    this.setState(() => ({ mode: 'scientific' }))
  }

  switchToNormal = () => {
    this.currentWindow.setSize(SMALL_WIDTH, SMALL_HEIGHT)
    this.setState(() => ({ mode: 'normal' }))
  }

  render() {
    const { mode } = this.state

    return (
      <Fragment>

        <AppHeader onChangeMode={this.changeMode}/>
        <AppUpdater />
        <Calculator mode={mode} />

      </Fragment>
    );
  }
}

export default Init
