import types from '../constants/actionTypes'
import Calc from '../libs/calc'

const calc = new Calc()
let diffState = {}

export default function calculator(state = calc.currentState(), action = {}) {
  const { type, payload } = action

  switch (type) {
  case types.RESET_CALCULATOR:
    return calc.reset()

  case types.ADD_OPERATOR:
    return calc.addOperator(payload)

  case types.ADD_NUMBER:
    return calc.addNumber(payload)

  case types.ADD_DECIMAL_POINT:
    return calc.addDecimalPoint()

  case types.CALCULATE:
    return calc.calculate()

  case types.INPUT_PERCENT:
    return calc.addPercentSign()

  case types.TOGGLE_SIGN:
    return calc.toggleSign()

  default:
    return state
  }
}
