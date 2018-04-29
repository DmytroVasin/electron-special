import React, { Component } from 'react';
import { connect } from 'react-redux'
import CalculatorDisplay from './CalculatorDisplay'
import Key from './Key'

import types from '../../constants/actionTypes'

const mapStateToProps = ({ calculator }) => ({ calculator })

class Calculator extends Component {

  onAddOperator = (key) => {
    this.props.dispatch({ type: types.ADD_OPERATOR, payload: key })
  }

  onAddNumber = (key) => {
    this.props.dispatch({ type: types.ADD_NUMBER, payload: key })
  }

  onDecimalPoint = () => {
    this.props.dispatch({ type: types.ADD_DECIMAL_POINT })
  }

  onClear = () => {
    this.props.dispatch({ type: types.RESET_CALCULATOR })
  }

  onCalculate = () => {
    this.props.dispatch({ type: types.CALCULATE })
  }

  inputPercent = () => {
    this.props.dispatch({ type: types.INPUT_PERCENT })
  }

  toggleSign = () => {
    this.props.dispatch({ type: types.TOGGLE_SIGN })
  }

  isPicked = (currentOperator) => {
    const { operator, previousKeyType } = this.props.calculator

    if (previousKeyType !== 'operator') return false
    if (operator !== currentOperator) return false

    return true
  }

  // handleKeyDown = (event) => {
  //   let { key } = event

  //   if (key === 'Enter')
  //     key = '='

  //   if ((/\d/).test(key)) {
  //     event.preventDefault()
  //     this.inputDigit(parseInt(key, 10))
  //   } else if (key in CalculatorOperations) {
  //     event.preventDefault()
  //     this.performOperation(key)
  //   } else if (key === '.') {
  //     event.preventDefault()
  //     this.inputDot()
  //   } else if (key === '%') {
  //     event.preventDefault()
  //     this.inputPercent()
  //   } else if (key === 'Backspace') {
  //     event.preventDefault()
  //     this.clearLastChar()
  //   } else if (key === 'Clear') {
  //     event.preventDefault()

  //     if (this.state.displayValue !== '0') {
  //       this.clearDisplay()
  //     } else {
  //       this.clearAll()
  //     }
  //   }
  // }

  // componentDidMount() {
  //   document.addEventListener('keydown', this.handleKeyDown)
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('keydown', this.handleKeyDown)
  // }

  render() {
    const { displayValue } = this.props.calculator
    const { mode } = this.props

    return (
      <div className="calculator">
        <CalculatorDisplay value={displayValue} />

        <div className={`calculator__keys calculator__${mode}`}>

          <Key className="key-clear" label='AC' handleClick={this.onClear} >AC</Key>
          <Key className="key-sign" label='+/-' handleClick={this.toggleSign} >+/-</Key>
          <Key className="key-percent" label='%' handleClick={this.inputPercent} >%</Key>

          <Key className="key-divide"   label='divide'   handleClick={this.onAddOperator} isPicked={ this.isPicked('divide') }>÷</Key>
          <Key className="key-multiply" label='multiply' handleClick={this.onAddOperator} isPicked={ this.isPicked('multiply') }>&times;</Key>
          <Key className="key-subtract" label='subtract' handleClick={this.onAddOperator} isPicked={ this.isPicked('subtract') }>-</Key>
          <Key className="key-add"      label='add'      handleClick={this.onAddOperator} isPicked={ this.isPicked('add') }>+</Key>
          <Key className="key-equals" label='=' handleClick={this.onCalculate} >=</Key>

          <Key className="key-9" label='9' handleClick={this.onAddNumber}>9</Key>
          <Key className="key-8" label='8' handleClick={this.onAddNumber}>8</Key>
          <Key className="key-7" label='7' handleClick={this.onAddNumber}>7</Key>
          <Key className="key-6" label='6' handleClick={this.onAddNumber}>6</Key>
          <Key className="key-5" label='5' handleClick={this.onAddNumber}>5</Key>
          <Key className="key-4" label='4' handleClick={this.onAddNumber}>4</Key>
          <Key className="key-3" label='3' handleClick={this.onAddNumber}>3</Key>
          <Key className="key-2" label='2' handleClick={this.onAddNumber}>2</Key>
          <Key className="key-1" label='1' handleClick={this.onAddNumber}>1</Key>
          <Key className="key-0" label='0' handleClick={this.onAddNumber}>0</Key>
          <Key className="key-dot" label='.' handleClick={this.onDecimalPoint}>.</Key>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Calculator)
