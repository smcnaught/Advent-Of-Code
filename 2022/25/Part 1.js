const formatter = require('../../shared/formatting/format-puzzle-input');
const data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();

function toRegular(toConvert) {
  let regular = 0
  for (let i = 0; i < toConvert.length; i++) {
    currentNum = toConvert[i] === '-' ? -1 : toConvert[i] === '=' ? -2 : +toConvert[i]
    regular += (currentNum * (Math.pow(5, toConvert.length - i - 1)))
  }

  return regular
}

function toSnafu(toConvert) {
  if (toConvert === 0) return ''

  const floor = Math.floor(toConvert / 5)
  const remainder = toConvert % 5

  switch (remainder) {
    case 0:
    case 1:
    case 2:
      return toSnafu(floor) + remainder
    case 3: return toSnafu(1 + floor) + '='
    case 4: return toSnafu(1 + floor) + '-'
  }
}

function getSum() {
  let sum = 0;
  for (let i = 0; i < data.length; i++) sum += toRegular(data[i])
  return sum
}

console.log(`Part One Answer: ${toSnafu(getSum())}`)