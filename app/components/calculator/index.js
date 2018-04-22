import React, { Component } from 'react';
import { connect } from 'react-redux'

import CalculatorDisplay from './CalculatorDisplay'
import Button from './Button'

import types from '../../constants/actionTypes'

const mapStateToProps = ({ calculator }) => ({ calculator })

class Calculator extends Component {

  onAddOperator = (key) => {
    this.props.dispatch({ type: types.ADD_OPERATOR, payload: key })
  }

  onAddNumber = (key) => {
    this.props.dispatch({ type: types.ADD_NUMBER, payload: key })
  }

  onDecimalPoint = (key) => {
    this.props.dispatch({ type: types.ADD_DECIMAL_POINT })
  }

  onClear = (key) => {
    this.props.dispatch({ type: types.RESET_CALCULATOR })
  }

  onCalculate = (key) => {
    this.props.dispatch({ type: types.CALCULATE })
  }

  isActive = (currentOperator) => {
    const { operator, previousKeyType } = this.state

    if (previousKeyType !== 'operator') return false
    if (operator !== currentOperator) return false

    return true
  }

  render() {
    const { displayValue } = this.props.calculator

    return (
      <div className="calculator">
        <CalculatorDisplay value={displayValue} />

        <div className="calculator__keys">
          <Button key='AC' handleClick={this.onClear} />
          <button>+/-</button>
          <button>%</button>

          {/* ÷ */}
          <Button key='divide' handleClick={this.onAddOperator} isOperator isActive={ this.isActive('divide') }/>

          <Button key='7' handleClick={this.onAddNumber} />
          <Button key='8' handleClick={this.onAddNumber} />
          <Button key='9' handleClick={this.onAddNumber} />

          {/* &times; */}
          <Button key='multiply' handleClick={this.onAddOperator} isOperator isActive={ this.isActive('multiply') }/>

          <Button key='4' handleClick={this.onAddNumber} />
          <Button key='5' handleClick={this.onAddNumber} />
          <Button key='6' handleClick={this.onAddNumber} />

          {/* - */}
          <Button key='subtract' handleClick={this.onAddOperator} isOperator isActive={ this.isActive('subtract') }/>

          <Button key='1' handleClick={this.onAddNumber} />
          <Button key='2' handleClick={this.onAddNumber} />
          <Button key='3' handleClick={this.onAddNumber} />

          {/* + */}
          <Button key='add' handleClick={this.onAddOperator} isOperator isActive={ this.isActive('add') }/>

          <Button key='0' handleClick={this.onAddNumber} isZero />
          <Button key='.' handleClick={this.onDecimalPoint} />

          <Button key='=' handleClick={this.onCalculate} isOperator />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Calculator)
