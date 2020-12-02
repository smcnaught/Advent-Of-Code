const formatter = require('../../shared/formatting/format-puzzle-input');
let passwords = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let valid = 0;

passwords.forEach(p => {
  const posA = +(p.substring(0, p.indexOf("-")));
  const posB = +(p.substring(p.indexOf("-") + 1, p.indexOf(" ")));

  const searchingFor = p.substring(p.indexOf(" ") + 1, p.indexOf(":"));
  const str = p.substring(p.indexOf(":") + 1, p.length);

  if ((str.charAt(posA) === searchingFor && str.charAt(posB) != searchingFor) || 
    (str.charAt(posB) === searchingFor && str.charAt(posA) != searchingFor))
    valid ++;
})

console.log(`Part Two Answer: ${valid}`);