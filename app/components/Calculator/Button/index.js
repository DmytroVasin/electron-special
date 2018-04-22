import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Button extends Component {
  onClick = () => {
    const { handleClick, key } = this.props

    handleClick(key)
  }

  render() {
    const { key, isZero, isOperator, isActive } = this.props
    let currentClass = ''

    if (isZero) { currentClass += ' key--zero' }
    if (isOperator) { currentClass += ' key--operator' }
    if (isActive) { currentClass += ' is-active' }

    return (
      <button onClick={ this.onClick } className={currentClass}>
        { key }
      </button>
    );
  }
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  key: PropTypes.string.isRequired,
  isZero: PropTypes.bool.isRequired,
  isOperator: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired
}

export default Button
