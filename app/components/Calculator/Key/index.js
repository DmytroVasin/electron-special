import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Key extends Component {
  onClick = () => {
    const { handleClick, label } = this.props

    handleClick(label)
  }

  render() {
    const { label, isZero, isOperator, isPicked, children, className } = this.props
    let currentClass = className

    if (isPicked) { currentClass += ' is-picked' }

    return (
      <button onClick={ this.onClick } className={currentClass}>
        { children }
      </button>
    );
  }
}

Key.propTypes = {
  handleClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  isPicked: PropTypes.bool
}

export default Key
