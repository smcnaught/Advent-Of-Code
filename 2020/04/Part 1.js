const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getRaw().split('\r\n\r\n');
const params = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
let validPassports = 0;

data.forEach(d => {
  let valid = true;

  params.forEach(p => {
    if (!d.includes(p)) valid = false;
  })

  if (valid) validPassports++;
})

console.log(`Part One Answer: ${validPassports}`);