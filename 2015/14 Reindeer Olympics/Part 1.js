let fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf-8');
let all = input.replace(/\r/g, '').replace(/can fly /g, '').replace(/km\/s for /g, '').replace(/seconds, but then must rest for /g, '').replace(/ seconds./g, '').split('\n').map(r => r.split(' '));
let reindeer = [];
const totalSeconds = 2503;

all.forEach(r => reindeer.push({ name: r[0], kms: +r[1], flyTime: +r[2], restTime: +r[3], currentTime: +r[2], flying: true, totalKms: 0 }));

(function calculateEachSecond()
{
  for (let i = 0; i < totalSeconds; i++)
  {
    for (let j = 0; j < reindeer.length; j++)
    {
      if (reindeer[j].currentTime === 0)
      {
        reindeer[j].currentTime = reindeer[j].flying ? reindeer[j].restTime : reindeer[j].flyTime;
        reindeer[j].flying = !reindeer[j].flying;
      }
      
      reindeer[j].currentTime -= 1;
      if (reindeer[j].flying) reindeer[j].totalKms += reindeer[j].kms;
    }
  }

  console.log(`Part One Answer: ${reindeer.sort((a, b) => a.totalKms < b.totalKms)[0].totalKms}`)
})();