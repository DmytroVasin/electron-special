import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Calculator extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayValue: this.props.displayValue
    }
  }

  handleAction = (typeOfAction) => {
    console.log(typeOfAction)
  }

  handleOperator = (buttonValue) => {
    let newValue
    const { displayValue } = this.state

    if (displayValue === '0') {
      newValue = buttonValue
    } else {
      newValue = displayValue + buttonValue
    }

    this.setState(() => ({ displayValue: newValue }))
  }

  render() {
    const { displayValue } = this.state

    return (
      <div className="calculator">
        <div className="calculator__display">{ displayValue }</div>

        <div className="calculator__keys">
          <button className="key--operator" onClick={ () => this.handleAction('add') }>+</button>
          <button className="key--operator" onClick={ () => this.handleAction('subtract') }>-</button>
          <button className="key--operator" onClick={ () => this.handleAction('multiply') }>&times;</button>
          <button className="key--operator" onClick={ () => this.handleAction('divide') }>÷</button>

          <button onClick={ () => this.handleOperator('7') }>7</button>
          <button onClick={ () => this.handleOperator('8') }>8</button>
          <button onClick={ () => this.handleOperator('9') }>9</button>
          <button onClick={ () => this.handleOperator('4') }>4</button>
          <button onClick={ () => this.handleOperator('5') }>5</button>
          <button onClick={ () => this.handleOperator('6') }>6</button>
          <button onClick={ () => this.handleOperator('1') }>1</button>
          <button onClick={ () => this.handleOperator('2') }>2</button>
          <button onClick={ () => this.handleOperator('3') }>3</button>
          <button onClick={ () => this.handleOperator('0') }>0</button>

          <button onClick={ () => this.handleAction('decimal') }>.</button>
          <button onClick={ () => this.handleAction('clear') }>AC</button>

          <button className="key--equal" onClick={ () => this.handleAction('calculate') }>=</button>
        </div>
      </div>
    );
  }
}

Calculator.propTypes = {
  displayValue: PropTypes.string.isRequired
}

export default Calculator
