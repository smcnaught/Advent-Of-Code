let moons = [
  { moon: 'Io', position: [17, 5, 1], velocity: [0, 0, 0] },
  { moon: 'Europa', position: [-2, -8, 8], velocity: [0, 0, 0] },
  { moon: 'Ganymede', position: [7, -6, 14], velocity: [0, 0, 0] },
  { moon: 'Callisto', position: [1, -10, 4], velocity: [0, 0, 0] },
];

function timeStep() {
  applyGravity();
  applyVelocity();
}

function applyGravity()
{
  // Within each time step, first update the velocity of every moon by applying gravity. 
  // To apply gravity, consider every pair of moons. 
  let allPairs = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3],
    [2, 3]
  ];

  allPairs.forEach(pair => {
    let moon1Index = pair[0];
    let moon2Index = pair[1];

    let moon1 = moons[moon1Index];
    let moon2 = moons[moon2Index];

    let m1x = moon1.position[0];
    let m2x = moon2.position[0];

    let m1y = moon1.position[1];
    let m2y = moon2.position[1];

    let m1z = moon1.position[2];
    let m2z = moon2.position[2];

    updateVelocity(0, m1x, m2x, moon1Index, moon2Index);
    updateVelocity(1, m1y, m2y, moon1Index, moon2Index);
    updateVelocity(2, m1z, m2z, moon1Index, moon2Index);
  })
}

function updateVelocity(axisType, axis1, axis2, index1, index2)
{
  // On each axis (x, y, and z), the velocity of each moon changes by exactly +1 or -1 
  // to pull the moons together. For example, if Ganymede has an x position of 3, and 
  // Callisto has a x position of 5, then Ganymede's x velocity changes by +1 (because 5 > 3) 
  // and Callisto's x velocity changes by -1 (because 3 < 5). 
  // However, if the positions on a given axis are the same, the velocity on that axis does not change for that pair of moons.
  if (axis1 > axis2)
  {
    moons[index1].velocity[axisType]--;
    moons[index2].velocity[axisType]++;
  }
  else if (axis2 > axis1)
  {
    moons[index2].velocity[axisType]--;
    moons[index1].velocity[axisType]++;
  }
}

function applyVelocity()
{
  /**
   * Then, update the position of every moon by applying velocity. 
   * simply add the velocity of each moon to its own position. 
   * For example, if Europa has a position of x=1, y=2, z=3 and a velocity of x=-2, y=0,z=3, 
   * then its new position would be x=-1, y=2, z=6. This process does not modify the velocity of any moon.
   */
  moons.forEach(m => {
    m.position[0] += m.velocity[0];
    m.position[1] += m.velocity[1];
    m.position[2] += m.velocity[2];
  })
}

function getTotalEnergy()
{
  let systemEnergy = 0;

  moons.forEach(moon => {
    // A moon's potential energy is the sum of the absolute values of its x, y, and z position coordinates. 
    let potentialEnergy = Math.abs(moon.position[0]) + Math.abs(moon.position[1]) + Math.abs(moon.position[2]);
    
    // A moon's kinetic energy is the sum of the absolute values of its velocity coordinates. 
    let kineticEnergy = Math.abs(moon.velocity[0]) + Math.abs(moon.velocity[1]) + Math.abs(moon.velocity[2]);
    
    // The total energy for a single moon is its potential energy multiplied by its kinetic energy. 
    let totalEnergy = potentialEnergy * kineticEnergy;
    systemEnergy+= totalEnergy;
  })

  return systemEnergy;
}

let count = 1000;
while (count > 0) {
  timeStep(); 
  // Time progresses by one step here
  // console.log('==================================')
  // console.log(moons);
  // console.log('==================================')
  count--;
}

console.log(`Part One Answer: ${getTotalEnergy()}`)