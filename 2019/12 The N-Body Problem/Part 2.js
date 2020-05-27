const moons = [
  { moon: 'Io', position: [17, 5, 1], velocity: [0, 0, 0] },
  { moon: 'Europa', position: [-2, -8, 8], velocity: [0, 0, 0] },
  { moon: 'Ganymede', position: [7, -6, 14], velocity: [0, 0, 0] },
  { moon: 'Callisto', position: [1, -10, 4], velocity: [0, 0, 0] },
];

const getGCD = (a, b) => b ? getGCD(b, a % b) : Math.abs(a);
const getLCM = (numbers) => {
  numbers.forEach(num => numbers[0] = (numbers[0] * num) / getGCD(numbers[0], num))
  return numbers[0];
}

// determine if positions on given axis are the same
function axisPositionsSame(axis, positions1, positions2) {
  const positionsAreTheSame = true;
  const smallest = positions1.length < positions2.length ? positions1.length : positions2.length;

  for (let i = 0; i < smallest; i++)
  {
    if (positions1[i][axis] !== positions2[i][axis]) return !positionsAreTheSame;
  }

  return positionsAreTheSame;
}

function movement(positions, velocities) {
  positions.forEach((pos1, i1) => {
    positions.forEach(pos2 => {
      for (let j = 0; j < 3; j++) {
        if (pos1[j] > pos2[j]) velocities[i1][j]--;
        else if (pos1[j] < pos2[j]) velocities[i1][j]++;
      }
    });
  });

  for (let j = 0; j < positions.length; j++) {
    for (let k = 0; k < 3; k ++) {
      positions[j][k] += velocities[j][k];
    }
  }
}

function getStepCount(moons) {
  let moonPositions = moons.map(m => m.position);
  const origins = [...moonPositions];
  const axisSteps = [0, 0, 0];
  const positions = origins.map(arr => arr.slice());
  const motionless = moons.map((x) => [0, 0, 0]);
  const velocities = motionless.map(arr => arr.slice());
  let steps = 0;

  while (axisSteps.indexOf(0) > -1) {
    movement(positions, velocities);
    steps++;

    for (let i = 0; i < axisSteps.length; i++) {
       if (axisSteps[i] === 0 &&
        axisPositionsSame(i, origins, positions) &&
        axisPositionsSame(i, motionless, velocities)) 
       {
        axisSteps[i] = steps;
       }
    }
  }

  return getLCM(axisSteps);
}

console.log(`Part Two Answer: ${getStepCount(moons)}`);