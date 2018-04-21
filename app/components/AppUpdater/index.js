import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendEvent } from '../../renderer/eventBus'

import CloseIcon from '../AppHeader/svg/CloseIcon'

const mapStateToProps = ({ updater }) => ({ updater })

class AppUpdater extends Component {
  downloadUpdates = () => {
    sendEvent('updater.download')
  }

  restartApp = () => {
    sendEvent('updater.relunch')
  }

  availablePopup = () => {
    return (
    <div className="icon-wrapper" onClick={this.downloadUpdates} >
      <CloseIcon hover={true} active={true} />
    </div>
    )
  }

  progressPopup = () => {
    const { data } = this.props.updater
    const percent = Math.round(data.percents)

    return (
      <div className="progress-process">
        <div className="progress-percents" style={{ width: `${percent}%` }} />
      </div>
    )
  }

  downloadedPopup = () => (
    <div className="icon-wrapper" onClick={this.restartApp} >
      <CloseIcon hover={true} active={true} />
    </div>
  )

  renderStatus(status) {
    switch (status) {
      case 'available':
        return this.availablePopup()
      case 'progress':
        return this.progressPopup()
      case 'downloaded':
        return this.downloadedPopup()
      default:
        return false
    }
  }

  render() {
    const { status } = this.props.updater
    const nonDisplayableStats = ['idle', 'error', 'checking', 'unavailable']

    if (nonDisplayableStats.includes(status)) {
      return null
    }

    return (
      <div className="updater">
        { this.renderStatus(status) }
      </div>
    )
  }
}

export default connect(mapStateToProps)(AppUpdater)
