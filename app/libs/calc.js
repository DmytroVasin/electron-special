export default class Calc {

  constructor() {
    this.methods = {
      '-': (first, second) => {
        return a - b;
      },

      '+': (first, second) => {
        return a + b;
      },

      '*': (first, second) => {
        return a * b;
      },

      '/': (first, second) => {
        return a / b;
      },

      '%': (first, second) => {
        const fixedDigits = first.replace(/^-?\d*\.?/, '')
        const newValue = parseFloat(first) / 100

        return String(newValue.toFixed(fixedDigits.length + 2))
      },

      '+/-': (first, second) => {
        return parseFloat(first) * -1
      }
    }
  }


  calculate = (first, operand, second) => {
    if (!methods[operand] || isNaN(first) || isNaN(second)) {
      return NaN;
    }

    return methods[operand](first, second);
  }
}
