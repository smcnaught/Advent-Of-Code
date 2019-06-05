const input = 29000000; /// ** Your input here ** ///
let houses = [];

for (let elf = 1; elf < input/10; elf++) 
{
  for (let present = elf; present < input/10; present+=elf)
  {
    if (!houses[present]) houses[present] = 10;
    houses[present] += elf * 10;
  }
}

let partOneAnswer = houses.filter(h => h >= input);
console.log(`Part One Answer: ${houses.indexOf(partOneAnswer[0])}`);