let boss = { HitPoints: 71, Damage: 10 };
let player = { HitPoints: 50, Mana: 500, Effects: { shield: 0, poison: 0, recharge: 0 } };
let timesPlayerWon = 0;
let manaPlayerSpent = 0;
let leastManaSpentToWin = Math.pow(10, 1000);
let [magicMissile, drain, shield, poison, recharge] = [
  { cost: 53, damage: 4 },
  { cost: 73, damage: 2, heals: 2 },
  { cost: 113, turns: 6, armor: 7 },
  { cost: 173, turns: 6, damage: 3 },
  { cost: 229, turns: 5, addMana: 101 }
]

function playGame() {
  let isPlayersTurn = true;
  while (player.HitPoints > 0 && boss.HitPoints > 0) {
    attack(isPlayersTurn);
    isPlayersTurn = !isPlayersTurn;
  }

  if (boss.HitPoints <= 0 && player.HitPoints > 0) {
    timesPlayerWon++;
    leastManaSpentToWin = manaPlayerSpent < leastManaSpentToWin ? manaPlayerSpent : leastManaSpentToWin;
  }

  boss = { HitPoints: 71, Damage: 10 };
  manaPlayerSpent = 0;
}

function attack(playerIsAttacking) {
  if (player.Effects.poison > 0) {
    player.Effects.poison--;
    boss.HitPoints -= poison.damage;
    if (boss.HitPoints <= 0) return;
  }
  if (player.Effects.recharge > 0) {
    player.Effects.recharge--;
    player.Mana += recharge.addMana;
  }
  if (player.Effects.shield > 0) player.Effects.shield--;

  if (playerIsAttacking) {
    if (player.Mana < magicMissile.cost) return player.HitPoints = 0; // player can't afford any spell

    while (true) {
      let next = Math.floor(Math.random() * (4 + 1) + 0);
      if (next === 0 && player.Mana >= magicMissile.cost) return castSpell(magicMissile);
      else if (next === 1 && player.Mana >= drain.cost) return castSpell(drain);
      else if (next === 2 && player.Mana >= shield.cost && player.Effects.shield === 0) return castSpell(shield);
      else if (next === 3 && player.Mana >= poison.cost && player.Effects.poison === 0) return castSpell(poison);
      else if (next === 4 && player.Mana >= recharge.cost && player.Effects.recharge === 0) return castSpell(recharge);
    }
  }
  else // boss is attacking
  {
    if (player.Effects.shield > 0) player.HitPoints -= (boss.Damage - shield.armor) || 1;
    else player.HitPoints -= boss.Damage || 1;
  }
}

function castSpell(spell) {
  player.Mana -= spell.cost;
  manaPlayerSpent += spell.cost;

  // Quality control to get the right more frequently.
  if (manaPlayerSpent > leastManaSpentToWin) return player.HitPoints = 0;

  switch (spell) {
    case magicMissile:
      boss.HitPoints -= magicMissile.damage;
      break;
    case drain:
      boss.HitPoints -= drain.damage;
      player.HitPoints += drain.heals;
      break;
    case shield:
      player.Effects.shield = shield.turns;
      break;
    case poison:
      player.Effects.poison = poison.turns;
      break;
    case recharge:
      player.Effects.recharge = recharge.turns;
      break;
    default:
      console.log("An incorrect value was passed into the switch statement in the castSpell method.");
      break;
  }
}

while (timesPlayerWon <= 5) {
  playGame();
  player = { HitPoints: 50, Mana: 500, Effects: { shield: 0, poison: 0, recharge: 0 } };
}

console.log(`Part One Answer: ${leastManaSpentToWin}`);