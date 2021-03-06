const fs = require('fs');
let input = fs.readFileSync('./input.txt').toString('utf-8').replace(/\r/g, '').replace(/\n/g, '').split(',');
let all = [], used = [], thrusters = [];

function getPermutations(items) {
  for (let i = 0; i < items.length; i++) {
    let item = items.splice(i, 1)[0];
    used.push(item);
    if (items.length == 0) all.push(used.slice());
    getPermutations(items);
    items.splice(i, 0, item);
    used.pop();
  }

  return all;
}

class Amp {
  constructor(all, setting) {
    this.stopped = false;
    this.index = 0;
    this.all = all;
    this.inputs = [setting];
  }

  runIntCodeComp(input) {
    let all = this.all;
    let inputs = this.inputs;
    let output = null;
    inputs.push(input);

    while (!this.stopped) {
      const str = all[this.index].padStart(5, '0');
      const opCode = +str.slice(3);
      const mode1 = +str[2];
      const mode2 = +str[1];
      let first = mode1 === 0 ? +all[all[this.index + 1]] : +all[this.index + 1];
      const second = mode2 === 0 ? +all[all[this.index + 2]] : +all[this.index + 2];
      const store = all[this.index + 3];

      if (opCode === 1) {
        all[store] = first + second;
        this.index += 4;
      } 
      else if (opCode === 2) {
        all[store] = first * second;
        this.index += 4;
      }
      else if (opCode === 3) {
        first = all[this.index + 1];
        all[first] = inputs.shift();
        this.index += 2;
      } 
      else if (opCode === 4) {
        output = first;
        this.index += 2;
        break;
      }
      else if (opCode === 5) {
        if (first !== 0) this.index = +second;
        else this.index += 3;
      } 
      else if (opCode === 6) {
        if (first === 0) this.index = second; 
        else this.index += 3;
      } 
      else if (opCode === 7) {
        all[store] = first < second ? 1 : 0;
        this.index += 4;
      } 
      else if (opCode === 8) {
        all[store] = first === second ? 1 : 0;
        this.index += 4;
      } 
      else if (opCode === 99) this.stopped = true;
    }

    return output;
  }
}

getPermutations([5, 6, 7, 8, 9]).forEach(amp => {
  const amps = amp.map((setting) => new Amp(input, setting));
  let index = last = 0;
  while (!amps[4].stopped) {
    const output = amps[index].runIntCodeComp(last);

    if (output !== null) last = output;
    index = index + 1 === amps.length ? 0 : index + 1;
  }

  thrusters.push(last);
})
console.log(`Part Two Answer: ${thrusters.sort((a, b) => b - a)[0]}`);