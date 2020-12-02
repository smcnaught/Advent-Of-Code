const formatter = require('../../shared/formatting/format-puzzle-input');
let passwords = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let valid = 0;

passwords.forEach(p => {
  const min = p.substring(0, p.indexOf("-"));
  const max = p.substring(p.indexOf("-") + 1, p.indexOf(" "));
  const searchingFor = p.substring(p.indexOf(" ") + 1, p.indexOf(":"));
  const str = p.substring(p.indexOf(":") + 1, p.length);

  const count = str.split(searchingFor).length -1;
  if (count >= min && count <= max) valid++;
})

console.log(`Part One Answer: ${valid}`);