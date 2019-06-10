let boss = { HitPoints: 100, Damage: 8, Armor: 2 };
let goldSpent = [];

let weapons = [
  { name: "Dagger", cost: 8, damage: 4, armor: 0 },
  { name: "Shortsword", cost: 10, damage: 5, armor: 0 },
  { name: "Warhammer", cost: 25, damage: 6, armor: 0 },
  { name: "Longsword", cost: 40, damage: 7, armor: 0 },
  { name: "Greataxe", cost: 74, damage: 8, armor: 0 }
];
let armor = [
  { name: "None", cost: 0, damage: 0, armor: 0 },
  { name: "Leather", cost: 13, damage: 0, armor: 1 },
  { name: "Chainmail", cost: 31, damage: 0, armor: 2 },
  { name: "Splintmail", cost: 53, damage: 0, armor: 3 },
  { name: "Bandedmail", cost: 75, damage: 0, armor: 4 },
  { name: "Platemail", cost: 102, damage: 0, armor: 5 }
];
let rings = [
  { name: 'Damage+0', cost: 0, damage: 0, armor: 0 },
  { name: 'Defense+0', cost: 0, damage: 0, armor: 0 },
  { name: "Damage+1", cost: 25, damage: 1, armor: 0 },
  { name: "Damage+2", cost: 50, damage: 2, armor: 0 },
  { name: "Damage+3", cost: 100, damage: 3, armor: 0 },
  { name: "Defense+1", cost: 20, damage: 0, armor: 1 },
  { name: "Defense+2", cost: 40, damage: 0, armor: 2 },
  { name: "Defense+3", cost: 80, damage: 0, armor: 3 }
];

function getPlayers() {
  let allPossiblePlayers = [];
  for (let w of weapons) {
    for (let a of armor) {
      for (let r1 of rings) {
        let differentRings = rings.filter(r2 => r2.name !== r1.name);
        for (let r2 of differentRings) {
          let damage = w.damage + a.damage + r1.damage + r2.damage; 
          let armr = w.armor + a.armor + r1.armor + r2.armor; 
          let gold = w.cost + a.cost + r1.cost + r2.cost; 
          allPossiblePlayers.push({ HitPoints: 100, Damage: damage, Armor: armr, GoldSpent: gold })
        }
      }
    }
  }
  return allPossiblePlayers;
}

function playGame(player, indexOfPlayer) {
  let currentAttacker = "player";
  while (boss.HitPoints > 0 && player.HitPoints > 0)
  {
    if (currentAttacker === "player") {
      attack(true, indexOfPlayer);
      currentAttacker = "boss";
    }
    else if (currentAttacker === "boss") {
      attack(false, indexOfPlayer);
      currentAttacker = "player";
    }
  }

  if (boss.HitPoints <= 0 && player.HitPoints > 0) goldSpent.push(player.GoldSpent);
  boss = { HitPoints: 100, Damage: 8, Armor: 2 };
}

function attack(playerAttacking, indexOfPlayer) {
  let player = allPlayers[indexOfPlayer];
  if (playerAttacking) boss.HitPoints -= Math.max(1, player.Damage - boss.Armor);
  else allPlayers[indexOfPlayer].HitPoints -= Math.max(1, boss.Damage - player.Armor);
}

let allPlayers = getPlayers();
for (let p = 0; p < allPlayers.length; p++)
{
  playGame(allPlayers[p], p);
}

console.log(`Part One Answer: ${goldSpent.sort((a, b) => a -b)[0]}`);