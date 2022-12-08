const formatter = require('../../shared/formatting/format-puzzle-input');
let currentDir = [];
let system = {};
new formatter.Formatter(__dirname).getArrayOfStringsByLine().map(line => {
  const newDir = line.substring(5);
  if (line.includes('$ cd')) {
    if (line.includes('..')) currentDir.pop();
    else currentDir.push(newDir);

    const fullPath = currentDir.join('/');
    if (!system.hasOwnProperty(fullPath)) system[fullPath] = { isDir: true, contains: [], size: 0, tooBig: false };
  }
  else if (!line.includes('$ ls')) {
    const fullPath = currentDir.join('/');
    if (line.includes('dir')) {
      const dirName = line.substring(4);
      const fullDirPath = fullPath + '/' + dirName;
      system[fullPath].contains.push(fullDirPath);
      if (!system.hasOwnProperty(fullDirPath)) system[fullDirPath] = { isDir: true, contains: [], size: 0, tooBig: false };
    }
    else if (/\d/.test(line)) {
      [size, fileNamePlusExt] = line.split(' ');
      const tooBig = +size > 100000;
      const fullFilePath = fullPath + '/' + fileNamePlusExt;
      if (!tooBig) {
        if (!system.hasOwnProperty(fullFilePath)) system[fullFilePath] = { isDir: false, contains: [], size: +size, tooBig: tooBig };
        if (!system[fullFilePath].tooBig) system[fullPath].contains.push(fullFilePath);
      }
      else {
        system[fullPath] = { isDir: false, contains: [], size: +size, tooBig: true };
      }
    }
  }
})

let newSystem = {};
let foundTooBig = true;
while (foundTooBig) {
  foundTooBig = false;
  Object.entries(system).forEach(([key, value]) => {
    let addToNewSystem = true;
    if (value.tooBig) addToNewSystem = false;
    else {
      value.contains.forEach(el => {
        if (!system[el] || system[el].tooBig) addToNewSystem = false;
      })
    }
  
    if (addToNewSystem) newSystem[key] = value;
    else foundTooBig = true;
  })

  system = newSystem;
  newSystem = {};
}

let keepGoing = true;
while (keepGoing) {
  keepGoing = false;
  Object.values(system).forEach(value => {
    let newContains = [];
    for (let i = 0; i < value.contains.length; i++) {
      const fileOrDirToCheck = value.contains[i];
      const fileOrDirSize = system[fileOrDirToCheck].size;
      if (fileOrDirSize !== 0) value.size += fileOrDirSize;
      else newContains.push(fileOrDirToCheck)
    }
    value.contains = newContains;
    if (newContains.length > 0) keepGoing = true;
  })
}

let sum = 0;
Object.values(system).forEach(val => {
  if (val && val.isDir && val.size < 100000) sum += val.size;
})

console.log(`Part One Answer: ${sum}`);