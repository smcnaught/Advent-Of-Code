const input = 29000000; /// ** Your input here ** ///
let houses = [];

for (let elf = 1; elf < input / 10; elf++)
{
  let visits = 0;
  for (let present = elf; present < input/10; present+=elf)
  {
    if (visits < 50) {
      if (!houses[present]) houses[present] = 11;
      houses[present] += elf * 11;
      visits++;
    }
  }
}

let partTwoAnswer = houses.filter(h => h >= input);
console.log(`Part Two Answer: ${houses.indexOf(partTwoAnswer[0])}`);