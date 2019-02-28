let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString('utf-8');
let instructions = input.replace(/,/g, '').replace(/\r/g, '').replace(/ /g, '').split('\n');

let a = 0; // "register 1"
let b = 0; // "register 2"
let num; // number to jmp, jie, jio

function runCommands(inst, currentPosition)
{
  if (inst === 'program end' || inst == undefined) return;
  let command = inst.slice(0, 3); // hlf, tpl, inc, jmp, jie, jio
  let register; // a | b
  let plusMinus; // + | -

  if (inst.charAt(3) === 'a' || inst.charAt(3) === 'b') register = inst.charAt(3);
  else plusMinus = inst.slice(3);

  if (inst.charAt(4) === '+' || inst.charAt(4) === '-') plusMinus = inst.slice(4);

  switch (command)
  {
    case 'hlf': hlf(register, currentPosition);
      break;
    case 'tpl': tpl(register, currentPosition);
      break;
    case 'inc': inc(register, currentPosition);
      break;
    case 'jmp': jmp(plusMinus, currentPosition);
      break;
    case 'jie': jie(register, plusMinus, currentPosition);
      break;
    case 'jio': jio(register, plusMinus, currentPosition);
      break;
    default: console.log('something broke in switch statement');
      break;
  }
}

function hlf(register, currentPosition)
{
  if (register == 'a') a = a / 2;
  if (register == 'b') b = b / 2;
  let position = incrementSpot(currentPosition, 1, '+');
  runCommands(instructions[position], position);
}

function tpl(register, currentPosition)
{
  if (register == 'a') a = a * 3;
  if (register == 'b') b = b * 3;
  let position = incrementSpot(currentPosition, 1, '+');
  runCommands(instructions[position], position);
}

function inc(register, currentPosition)
{
  if (register == 'a') a = a + 1;
  if (register == 'b') b = b + 1;
  let position = incrementSpot(currentPosition, 1, '+');
  runCommands(instructions[position], position);
}

function jmp(plusMinus, currentPosition)
{
  num = +plusMinus.slice(1);
  if (plusMinus.charAt(0) === '+')
  {
    let position = incrementSpot(currentPosition, num, '+');
    runCommands(instructions[position], position);
  }
  else if (plusMinus.charAt(0) === '-')
  {
    let position = incrementSpot(currentPosition, num, '-');
    runCommands(instructions[position], position);
  }
  else
  {
    let position = incrementSpot(currentPosition, 1, '+');
    runCommands(instructions[position], position);
  }
}

function jie(register, plusMinus, currentPosition)
{
  num = parseInt(plusMinus.slice(1));
  let aRegAndAIsEven = register === 'a' && a % 2 === 0;
  let bRegAndBIsEven = register === 'b' && b % 2 === 0;
  if (aRegAndAIsEven || bRegAndBIsEven)
  {
    let position = incrementSpot(currentPosition, num, '+');
    runCommands(instructions[position], position);
  }
  else
  {
    let position = incrementSpot(currentPosition, 1, '+');
    runCommands(instructions[position], position);
  }
}

function jio(register, plusMinus, currentPosition)
{
  num = parseInt(plusMinus.slice(1));
  let aRegAndOne = register === 'a' && a === 1;
  let bRegAndOne = register === 'b' && b === 1;
  if (aRegAndOne || bRegAndOne)
  {
    let position = incrementSpot(currentPosition, num, '+');
    runCommands(instructions[position], position);
  }
  else
  {
    let position = incrementSpot(currentPosition, 1, '+');
    runCommands(instructions[position], position);
  }
}

function incrementSpot(curPos, incrementBy, addOrSub)
{
  if (addOrSub === '+')
  {
    if (curPos + incrementBy <= 48) return curPos + incrementBy;
    else console.log(`Part One Answer: Value of a: ${a} - Value of b: ${b}`);
  }

  if (addOrSub === '-')
  {
    if (curPos - incrementBy >= 0) return curPos - incrementBy;
    else console.log(`Part One Answer: Value of a: ${a} - Value of b: ${b}`);
  }
}

runCommands(instructions[0], 0);