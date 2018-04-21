import React from 'react'
import { remote } from 'electron'
import CloseIcon from './svg/CloseIcon'
import MinimizeIcon from './svg/MinimizeIcon'
import MaximizeIcon from './svg/MaximizeIcon'
import { SMALL_WIDTH, SMALL_HEIGHT, BIG_WIDTH, BIG_HEIGHT } from '../../constants/app'

class WindowHeader extends React.Component {
  state = {
    isHovered: false,
    isFocused: true
  }

  constructor(props) {
    super(props)

    const win = remote.getCurrentWindow();
    win.on('focus', () => {
      this.isFocused(true)
    })
    win.on('blur', () => {
      this.isFocused(false)
    })
  }

  isFocused = (bool) => {
    this.setState(() => ({ isFocused: bool }))
  }

  handleWindowClose = () => {
    remote.app.dock.hide();
    remote.getCurrentWindow().hide()
  }
  handleWindowMinimize = () => {
    remote.getCurrentWindow().minimize()
  }
  handleWindowMaximize = () => {
    const currentWindow = remote.getCurrentWindow()
    const { width, height } = currentWindow.getBounds()

    if (width === SMALL_WIDTH) {
      currentWindow.setSize(BIG_WIDTH, BIG_HEIGHT)
    } else {
      currentWindow.setSize(SMALL_WIDTH, SMALL_HEIGHT)
    }
  }

  onMouseHover = () => {
    this.setState(() => ({ isHovered: true }))
  }
  onMouseUnHover = () => {
    this.setState(() => ({ isHovered: false }))
  }

  render() {
    const { isHovered, isFocused } = this.state

    return (
      <div className='window-header'>
        <div className='window-header-controls' onMouseEnter={this.onMouseHover} onMouseLeave={this.onMouseUnHover}>

          <div className='btn' onClick={ this.handleWindowClose }>
            <CloseIcon hover={isHovered} active={isFocused} />
          </div>

          <div className='btn' onClick={ this.handleWindowMinimize }>
            <MinimizeIcon hover={isHovered} active={isFocused} />
          </div>

          <div className='btn' onClick={ this.handleWindowMaximize }>
            <MaximizeIcon hover={isHovered} active={isFocused} />
          </div>
        </div>
      </div>
    )
  }
}

export default WindowHeader
