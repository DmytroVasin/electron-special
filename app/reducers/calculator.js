import types from '../constants/actionTypes'

const initialState = {
  displayValue: 0,
  firstValue: null,
  operator: null,
  previousKeyType: null,
}

export default function calculator(state = initialState, action = {}) {
  const { type } = action

  switch (type) {
  case types.RESET_CALCULATOR:
    return initialState

  case types.ADD_OPERATOR:
    // action.payload

    // const { displayValue, firstValue, operator } = this.state

    // if (operator) {
    //   this.setState((state) => {
    //     return {
    //       operator: typeOfAction,
    //       previousKeyType: 'operator'
    //     }
    //   })
    // } else {
    //   this.setState(({ displayValue }) => {
    //     return {
    //       operator: typeOfAction,
    //       firstValue: displayValue,
    //       previousKeyType: 'operator'
    //     }
    //   })
    // }
    return initialState

  case types.ADD_NUMBER:
    // action.payload

    // let newValue
    // const { displayValue, firstValue, operator, previousKeyType } = this.state

    // if (previousKeyType === 'operator') {
    //   newValue = buttonValue
    // } else {
    //   if (displayValue === '0') {
    //     newValue = buttonValue
    //   } else {
    //     newValue = displayValue + buttonValue
    //   }
    // }

    // this.setState(() => ({
    //   displayValue: newValue,
    //   previousKeyType: 'number'
    // }))
    return initialState

  case types.ADD_DECIMAL_POINT:
    // if (previousKeyType === 'operator') {
    //   this.setState(() => ({
    //     displayValue: '0.',
    //     previousKeyType: 'number'
    //   }))
    // } else {
    //   if (displayValue.includes('.')) return

    //   this.setState(() => ({
    //     displayValue: displayValue + '.',
    //     previousKeyType: 'number'
    //   }))
    // }
    // return { ...state, token: action.payload }
    return initialState

  case types.CALCULATE:

    // const { displayValue, firstValue, operator } = this.state
    // let result = this.calculate(firstValue, operator, displayValue)

    // this.setState((state) => {
    //   return {
    //     displayValue: result,
    //     firstValue: result,
    //     operator: null,
    //     previousKeyType: 'operator'
    //   }
    // })

    // ---------------

    // let result = ''

    // if (operator === 'add') {
    //   result = parseFloat(n1) + parseFloat(n2)
    // } else if (operator === 'subtract') {
    //   result = parseFloat(n1) - parseFloat(n2)
    // } else if (operator === 'multiply') {
    //   result = parseFloat(n1) * parseFloat(n2)
    // } else if (operator === 'divide') {
    //   result = parseFloat(n1) / parseFloat(n2)
    // }

    // return result.toString()
    return initialState

  default:
    return state
  }
}
