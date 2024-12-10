const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).get2DArrayOfNumbers();
let countSafeReports = 0
data.forEach(report => {
  if (reportIsSafe(report) || reportSafeAfterLevelRemoved(report)) countSafeReports++
})

function reportIsSafe(reportToCheck) {
  firstDiff = reportToCheck[1] - reportToCheck[0]
  isIncreasing = firstDiff > 0
  let reportIsSafe = true

  for (let i = 0; i < reportToCheck.length - 1; i++) {
    current = reportToCheck[i]
    next = reportToCheck[i + 1]
    diff = Math.abs(current - next)
    if ((isIncreasing && current >= next) || (!isIncreasing && current <= next) || (diff < 1 || diff > 3)) reportIsSafe = false;
  }

  return reportIsSafe
}

function reportSafeAfterLevelRemoved(reportToCheck) {
  for (let i = 0; i < reportToCheck.length; i++) {
    clone = JSON.parse(JSON.stringify(reportToCheck))
    clone.splice(i, 1)
    reportSafe = reportIsSafe(clone);
    if (reportSafe) return true;
  }
  
  return false;
}

console.log(`Part Two Answer: ${countSafeReports}`);