import types from '../constants/actionTypes'
import Calc from '../libs/calc'

const calc = new Calc()
let diffState = {}

const initialState = {
  displayValue: '0',
  prevValue: null,
  operator: null,
  previousKeyType: null,
}

export default function calculator(state = initialState, action = {}) {
  const { displayValue, prevValue, operator, previousKeyType } = state
  const { type, payload } = action

  switch (type) {
  case types.RESET_CALCULATOR:
    return initialState

  case types.ADD_OPERATOR:
    const operator = payload

    if (operator) {
      diffState = {
        operator: operator,
        previousKeyType: 'operator'
      }
    } else {
      diffState = {
        operator: operator,
        prevValue: displayValue,
        previousKeyType: 'operator'
      }
    }

    return { ...state, ...diffState }

  case types.ADD_NUMBER:
    const digit = payload
    let newValue

    if (previousKeyType === 'operator') {
      newValue = digit
    } else {
      newValue = displayValue === '0' ? digit : displayValue + digit
    }

    return { ...state,
      displayValue:    newValue,
      previousKeyType: 'number'
    }

  case types.ADD_DECIMAL_POINT:
    if (previousKeyType === 'operator') {
      diffState = {
        displayValue: '0.',
        previousKeyType: 'number'
      }
    } else {
      if (!displayValue.includes('.')) {
        diffState = {
          displayValue: displayValue + '.',
          previousKeyType: 'number'
        }
      }
    }

    return { ...state, ...diffState }

  case types.CALCULATE:
    let result = calc(prevValue, operator, displayValue)

    if (prevValue == null) {
      return state
    }

    return {
      displayValue: String(result),
      prevValue: String(result),
      operator: null,
      previousKeyType: 'operator'
    }

  case types.INPUT_PERCENT:
    diffState = {
      prevValue:       null,
      operator:        null,
      previousKeyType: 'operator'
    }
    diffState['displayValue'] = calc.calculate(prevValue, operator, displayValue)

    return { ...state, ...diffState }

  case types.TOGGLE_SIGN:
    diffState = {
      prevValue:       null,
      operator:        null,
      previousKeyType: 'operator'
    }
    diffState['displayValue'] = calc.calculate(prevValue, operator, displayValue)

    return { ...state, ...diffState }

  default:
    return state
  }
}
