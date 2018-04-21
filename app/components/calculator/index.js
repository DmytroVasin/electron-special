import React, { Component } from 'react';
import PropTypes from 'prop-types'
import CalculatorDisplay from './CalculatorDisplay'

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
      this.setState((state) => {
        return {
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
    const { displayValue } = this.state

    if ( displayValue === '0' ) {
      this.setState((state) => {
        return {
          displayValue: '0',
          firstValue: null,
          operator: null,
          previousKeyType: null
        }
      })
    } else {
      this.setState((state) => {
        return {
          displayValue: '0'
        }
      })
    }
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

  isActive = (currentOperator) => {
    const { operator, previousKeyType } = this.state

    if (previousKeyType !== 'operator') return ''
    if (operator !== currentOperator) return ''

    return 'is-active'
  }

  render() {
    const { displayValue, operator } = this.state
    const clearButtonText = +displayValue ? 'C' : 'AC'

    return (
      <div className="calculator">
        <CalculatorDisplay value={displayValue} />

        <div className="calculator__keys">
          <button onClick={ this.onClear }>{ clearButtonText }</button>
          <button>+/-</button>
          <button>%</button>
          <button className={'key--operator ' + this.isActive('divide') } onClick={ () => this.handleOperator('divide') }>÷</button>

          <button onClick={ () => this.handleNumber('7') }>7</button>
          <button onClick={ () => this.handleNumber('8') }>8</button>
          <button onClick={ () => this.handleNumber('9') }>9</button>
          <button className={'key--operator ' + this.isActive('multiply') } onClick={ () => this.handleOperator('multiply') }>&times;</button>



          <button onClick={ () => this.handleNumber('4') }>4</button>
          <button onClick={ () => this.handleNumber('5') }>5</button>
          <button onClick={ () => this.handleNumber('6') }>6</button>
          <button className={'key--operator ' + this.isActive('subtract') } onClick={ () => this.handleOperator('subtract') }>-</button>

          <button onClick={ () => this.handleNumber('1') }>1</button>
          <button onClick={ () => this.handleNumber('2') }>2</button>
          <button onClick={ () => this.handleNumber('3') }>3</button>
          <button className={'key--operator ' + this.isActive('add') } onClick={ () => this.handleOperator('add') }>+</button>

          <button className={'key--zero'} onClick={ () => this.handleNumber('0') }>0</button>
          <button onClick={ this.onDecimalPoint }>.</button>
          <button className={'key--operator'} onClick={ this.onCalculate }>=</button>
        </div>
      </div>
    );
  }
}

Calculator.propTypes = {
  displayValue: PropTypes.string.isRequired
}

export default Calculator
