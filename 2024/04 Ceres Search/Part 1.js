const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getArrayOfStringsByLine();
let count = 0;
for (let i = 0; i < data.length; i++) {
  let currentRow = data[i]

  for (let j = 0; j < currentRow.length; j++) {
    [currentLetter, up1, up2, up3, down1, down2, down3, right1, right2, right3, left1, left2, left3, diagUpLeft1, diagUpLeft2, diagUpLeft3, diagUpRight1, diagUpRight2, diagUpRight3, diagDownLeft1, diagDownLeft2, diagDownLeft3, diagDownRight1, diagDownRight2, diagDownRight3] = [
      (data[i][j]), // currentLetter
      (data[i - 1] ? data[i - 1][j] : undefined), // up1
      (data[i - 2] ? data[i - 2][j] : undefined), // up2
      (data[i - 3] ? data[i - 3][j] : undefined), // up3

      (data[i + 1] ? data[i + 1][j] : undefined), // down1
      (data[i + 2] ? data[i + 2][j] : undefined), // down2
      (data[i + 3] ? data[i + 3][j] : undefined), // down3

      (data[i] ? data[i][j + 1] : undefined), // right1
      (data[i] ? data[i][j + 2] : undefined), // right2
      (data[i] ? data[i][j + 3] : undefined), // right3

      (data[i] ? data[i][j - 1] : undefined), // left1
      (data[i] ? data[i][j - 2] : undefined), // left2
      (data[i] ? data[i][j - 3] : undefined), // left3

      (data[i - 1] ? data[i - 1][j - 1] : undefined), // diagUpLeft1
      (data[i - 2] ? data[i - 2][j - 2] : undefined), // diagUpLeft2
      (data[i - 3] ? data[i - 3][j - 3] : undefined), // diagUpLeft3

      (data[i - 1] ? data[i - 1][j + 1] : undefined), // diagUpRight1
      (data[i - 2] ? data[i - 2][j + 2] : undefined), // diagUpRight2
      (data[i - 3] ? data[i - 3][j + 3] : undefined), // diagUpRight3

      (data[i + 1] ? data[i + 1][j - 1] : undefined), // diagDownLeft1
      (data[i + 2] ? data[i + 2][j - 2] : undefined), // diagDownLeft2
      (data[i + 3] ? data[i + 3][j - 3] : undefined), // diagDownLeft3

      (data[i + 1] ? data[i + 1][j + 1] : undefined), // diagDownRight1
      (data[i + 2] ? data[i + 2][j + 2] : undefined), // diagDownRight2
      (data[i + 3] ? data[i + 3][j + 3] : undefined), // diagDownRight3
    ];

    if (currentLetter == 'X') {
      aboveLetters = (up1 && up2 && up3) ? (currentLetter + up1 + up2 + up3) : ''
      belowLetters = (down1 && down2 && down3) ? (currentLetter + down1 + down2 + down3) : ''
      leftLetters = (left1 && left2 && left3) ? (currentLetter + left1 + left2 + left3) : ''
      rightLetters = (right1 && right2 && right3) ? (currentLetter + right1 + right2 + right3) : ''
      diagUpLeftLetters = (diagUpLeft1 && diagUpLeft2 && diagUpLeft3) ? (currentLetter + diagUpLeft1 + diagUpLeft2 + diagUpLeft3) : ''
      diagUpRightLetters = (diagUpRight1 && diagUpRight2 && diagUpRight3) ? (currentLetter + diagUpRight1 + diagUpRight2 + diagUpRight3) : ''
      diagDownLeftLetters = (diagDownLeft1 && diagDownLeft2 && diagDownLeft3) ? (currentLetter + diagDownLeft1 + diagDownLeft2 + diagDownLeft3) : ''
      diagDownRightLetters = (diagDownRight1 && diagDownRight2 && diagDownRight3) ? (currentLetter + diagDownRight1 + diagDownRight2 + diagDownRight3) : ''
      
      if (aboveLetters === 'XMAS') count++;
      if (belowLetters === 'XMAS') count++;
      if (leftLetters === 'XMAS') count++;
      if (rightLetters === 'XMAS') count++;
      if (diagUpLeftLetters === 'XMAS') count++;
      if (diagUpRightLetters === 'XMAS') count++;
      if (diagDownLeftLetters === 'XMAS') count++;
      if (diagDownRightLetters === 'XMAS') count++;
    }
  }
}
console.log(`Part One Answer: ${count}`);