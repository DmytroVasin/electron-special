import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { getFontSizeFor } from '../../../helpers/app'

class CalculatorDisplay extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      fontSize: getFontSizeFor(nextProps.value)
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      fontSize: getFontSizeFor(props.value)
    }
  }

  render() {
    const { value } = this.props
    const { fontSize } = this.state

    return (
      <div className="calculator__display">
        <div className="display-value" style={{ fontSize: `${fontSize}px` }}>
          { value }
        </div>
      </div>
    );
  }
}

CalculatorDisplay.propTypes = {
  value: PropTypes.string.isRequired
}

export default CalculatorDisplay
