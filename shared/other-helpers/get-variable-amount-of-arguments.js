function getAllArguments(...args) {
  console.log(`Number of arguments passed in: ${args.length}`);
  args.forEach(arg => console.log(arg));
}
getAllArguments('one', 'two', 'three', 'four', 'five');