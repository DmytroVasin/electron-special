import math from 'mathjs'

export default class Calc {

//  {command: 'sin', action: 'Math.sin(__param__)'},
//  {command: 'cos', action: 'Math.cos(__param__)'},
//  {command: 'tan', action: 'Math.tan(__param__)'},
//  {command: 'ln', action: 'Math.log(__param__)'},
//  {command: 'log', action: 'Math.log(__param__) / Math.log(10)'},

  constructor() {
    this.inPrecision = (value) => {
      return math.format(value, 14)
    }
    this.methods = {
      'subtract': (first, second) => {
        return math.subtract(first, second)
      },

      'add': (first, second) => {
        return math.add(first, second)
      },

      'multiply': (first, second) => {
        return math.multiply(first, second)
      },

      'divide': (first, second) => {
        return math.divide(first, second)
      },
    }

    this.displayValue    = '0'
    this.prevValue       = null
    this.operator        = null
    this.previousKeyType = null
    this.lastEqualOperation = {
      value: null,
      operator: null
    }
  }

  currentState() {
    return {
      displayValue: this.displayValue,
      prevValue: this.prevValue,
      operator: this.operator,
      previousKeyType: this.previousKeyType,
      lastEqualOperation: this.lastEqualOperation,
    }
  }

  setState = ({ displayValue, prevValue, operator, previousKeyType }) => {
    if (typeof displayValue != 'undefined')    { this.displayValue    = String(displayValue)    }
    if (typeof prevValue != 'undefined')       { this.prevValue       = String(prevValue)       }
    if (typeof operator != 'undefined')        { this.operator        = String(operator)        }
    if (typeof previousKeyType != 'undefined') { this.previousKeyType = String(previousKeyType) }

    return this.currentState()
  }

  compute = (first, operand, second) => {
    if (!this.methods[operand] || isNaN(first) || isNaN(second)) {
      return NaN;
    }

    return this.inPrecision(this.methods[operand](first, second))
  }

  calculate = () => {
    if (this.prevValue === null && this.lastEqualOperation.value === null) {
      return this.currentState()
    }

    if (this.prevValue === null && this.lastEqualOperation.value !== null) {
      let result = this.compute(this.displayValue, this.lastEqualOperation.operator, this.lastEqualOperation.value)

      return this.setState({
        displayValue: result,
        previousKeyType: 'number'
      })
    }

    let result = this.compute(this.prevValue, this.operator, this.displayValue)

    this.lastEqualOperation = {
      value: this.displayValue,
      operator: this.operator
    }
    this.prevValue = null
    this.operator = null

    return this.setState({
      displayValue: result,
      previousKeyType: 'number'
    })
  }

  addNumber = (number) => {
    let newDisplayValue

    if (this.previousKeyType === 'operator') {
      newDisplayValue = number
    } else {
      newDisplayValue = this.displayValue === '0' ? number : this.displayValue + number
    }

    return this.setState({
      displayValue:    newDisplayValue,
      previousKeyType: 'number'
    })
  }

  addDecimalPoint = () => {
    let diffState = {}

    if (this.previousKeyType === 'operator') {
      diffState = {
        displayValue: '0.',
        previousKeyType: 'number'
      }
    } else {
      if (!this.displayValue.includes('.')) {
        diffState = {
          displayValue: this.displayValue + '.',
          previousKeyType: 'number'
        }
      }
    }

    return this.setState(diffState)
  }

  toggleSign = () => {
    let newDisplayValue
    newDisplayValue = parseFloat(this.displayValue) * -1

    return this.setState({
      displayValue:    newDisplayValue,
      previousKeyType: 'number'
    })
  }

  addPercentSign = () => {
    let newDisplayValue

    const fixedDigits = this.displayValue.replace(/^-?\d*\.?/, '')
    const newValue = parseFloat(this.displayValue) / 100

    newDisplayValue =  newValue.toFixed(fixedDigits.length + 2)

    return this.setState({
      displayValue:    newDisplayValue,
      previousKeyType: 'number'
    })
  }

  addOperator = (operator) => {
    let diffState = {}

    if (this.previousKeyType === 'operator') {
      diffState = {
        operator: operator
      }
    } else {
      if (this.operator) {
        let newDisplayValue = this.compute(this.prevValue, this.operator, this.displayValue)

        diffState = {
          prevValue: newDisplayValue,
          displayValue: newDisplayValue,
          operator: operator,
          previousKeyType: 'operator'
        }
      } else {
        diffState = {
          prevValue: this.displayValue,
          operator: operator,
          previousKeyType: 'operator'
        }
      }
    }

    return this.setState(diffState)
  }

  reset = () => {
    this.displayValue =     '0'
    this.prevValue =        null
    this.operator =         null
    this.previousKeyType =  null
    this.lastEqualOperation = {
      value: null,
      operator: null
    }

    return this.currentState()
  }
}
