import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Calculator extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayValue: this.props.displayValue,
      firstValue: null,
      operator: null,
      previousKeyType: null
    }
  }

  handleOperator = (typeOfAction) => {
    const { displayValue, firstValue, operator } = this.state

    if (operator) {
      let result = this.calculate(firstValue, operator, displayValue)

      this.setState((state) => {
        return {
          displayValue: result,
          firstValue: result,
          operator: typeOfAction,
          previousKeyType: 'operator'
        }
      })
    } else {
      this.setState(({ displayValue }) => {
        return {
          operator: typeOfAction,
          firstValue: displayValue,
          previousKeyType: 'operator'
        }
      })
    }
  }

  handleNumber = (buttonValue) => {
    let newValue
    const { displayValue, firstValue, operator, previousKeyType } = this.state

    if (previousKeyType === 'operator') {
      newValue = buttonValue
    } else {
      if (displayValue === '0') {
        newValue = buttonValue
      } else {
        newValue = displayValue + buttonValue
      }
    }

    this.setState(() => ({
      displayValue: newValue,
      previousKeyType: 'number'
    }))
  }

  calculate = (n1, operator, n2) => {
    let result = ''

    if (operator === 'add') {
      result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
      result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === 'multiply') {
      result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === 'divide') {
      result = parseFloat(n1) / parseFloat(n2)
    }

    return result.toString()
  }

  onDecimalPoint = () => {
    const { displayValue, previousKeyType } = this.state

    if (previousKeyType === 'operator') {
      this.setState(() => ({
        displayValue: '0.',
        previousKeyType: 'number'
      }))
    } else {
      if (displayValue.includes('.')) return

      this.setState(() => ({
        displayValue: displayValue + '.',
        previousKeyType: 'number'
      }))
    }
  }

  onClear = () => {
    // console.log('....')
  }

  onCalculate = () => {
    const { displayValue, firstValue, operator } = this.state
    let result = this.calculate(firstValue, operator, displayValue)

    this.setState((state) => {
      return {
        displayValue: result,
        firstValue: result,
        operator: null,
        previousKeyType: 'operator'
      }
    })
  }

  render() {
    console.log(this.state)

    const { displayValue, operator, previousKeyType } = this.state

    return (
      <div className="calculator">
        <div className="calculator__display">{ displayValue }</div>

        <div className="calculator__keys">

          <button className={"key--operator " + ( (previousKeyType === 'operator' && operator === 'add') ? 'is-active' : '')} onClick={ () => this.handleOperator('add') }>+</button>
          <button className={"key--operator " + ( (previousKeyType === 'operator' && operator === 'subtract') ? 'is-active' : '')} onClick={ () => this.handleOperator('subtract') }>-</button>
          <button className={"key--operator " + ( (previousKeyType === 'operator' && operator === 'multiply') ? 'is-active' : '')} onClick={ () => this.handleOperator('multiply') }>&times;</button>
          <button className={"key--operator " + ( (previousKeyType === 'operator' && operator === 'divide') ? 'is-active' : '')} onClick={ () => this.handleOperator('divide') }>÷</button>

          <button onClick={ () => this.handleNumber('7') }>7</button>
          <button onClick={ () => this.handleNumber('8') }>8</button>
          <button onClick={ () => this.handleNumber('9') }>9</button>
          <button onClick={ () => this.handleNumber('4') }>4</button>
          <button onClick={ () => this.handleNumber('5') }>5</button>
          <button onClick={ () => this.handleNumber('6') }>6</button>
          <button onClick={ () => this.handleNumber('1') }>1</button>
          <button onClick={ () => this.handleNumber('2') }>2</button>
          <button onClick={ () => this.handleNumber('3') }>3</button>
          <button onClick={ () => this.handleNumber('0') }>0</button>

          <button onClick={ this.onDecimalPoint }>.</button>
          <button onClick={ this.onClear }>AC</button>

          <button className="key--equal" onClick={ this.onCalculate }>=</button>
        </div>
      </div>
    );
  }
}

Calculator.propTypes = {
  displayValue: PropTypes.string.isRequired
}

export default Calculator
