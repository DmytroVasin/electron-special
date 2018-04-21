const { clipboard } = require('electron')

export const getFontSizeFor = ({ length }) => {
  if (length < 10)   return '36'
  if (length < 11)   return '33'
  if (length < 12)   return '29'
  if (length < 13)  return '27'
  if (length < 14)  return '25'
  if (length < 15)  return '23'
  if (length < 16)  return '21'
  if (length < 17)  return '20'
  if (length < 18)  return '19'
  if (length < 19)  return '18'
  if (length < 20)  return '17'
  if (length < 21)  return '16'
  if (length < 22)  return '15'
  if (length < 24)  return '14'
  if (length < 25)  return '13'
  if (length < 26)  return '12'
}

export const writeToClipboard = (text) => {
  clipboard.write({ text: text })
}
