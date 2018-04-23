import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Key extends Component {
  onClick = () => {
    const { handleClick, label } = this.props

    handleClick(label)
  }

  render() {
    const { label, isZero, isOperator, isActive } = this.props
    let currentClass = ''

    if (isZero) { currentClass += ' key--zero' }
    if (isOperator) { currentClass += ' key--operator' }
    if (isActive) { currentClass += ' is-active' }

    return (
      <button onClick={ this.onClick } className={currentClass}>
        { label }
      </button>
    );
  }
}

Key.propTypes = {
  handleClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  isZero: PropTypes.bool,
  isOperator: PropTypes.bool,
  isActive: PropTypes.bool
}

export default Key
