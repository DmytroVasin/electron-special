const { clipboard } = require('electron')

export const getFontSizeFor = (value, mode) => {
  if( mode === 'normal') {
    return normalFontSize(value.length)
  } else {
    return scientificFontSize(value.length)
  }
}

const scientificFontSize = (length) => {
  if (length < 20)  return '36'
  if (length < 22)  return '33'
  if (length < 24)  return '29'
  if (length < 26)  return '27'
  if (length < 28)  return '25'
  if (length < 30)  return '23'
  if (length < 32)  return '21'
  if (length < 34)  return '20'
  if (length < 36)  return '19'
  if (length < 38)  return '18'
  if (length < 40)  return '17'
  if (length < 42)  return '16'
  if (length < 44)  return '15'
  if (length < 48)  return '14'
  if (length < 50)  return '13'
  if (length < 52)  return '12'
  if (length < 56)  return '11'
  if (length < 60)  return '10'
  if (length < 64)  return '9'
  if (length < 68)  return '8'
}

const normalFontSize = (length) => {
  if (length < 10)  return '36'
  if (length < 11)  return '33'
  if (length < 12)  return '29'
  if (length < 13)  return '27'
  if (length < 14)  return '25'
  if (length < 15)  return '23'
  if (length < 16)  return '21'
  if (length < 17)  return '19'
  if (length < 18)  return '18'
  if (length < 19)  return '17'
  if (length < 20)  return '16'
  if (length < 21)  return '15'
  if (length < 22)  return '14'
  if (length < 24)  return '13'
  if (length < 25)  return '12'
  if (length < 27)  return '11'
  if (length < 29)  return '10'
  if (length < 31)  return '9'
  if (length < 33)  return '8'
}

export const writeToClipboard = (text) => {
  clipboard.writeText(text)
}
